const User = require("../models/usersModel");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto"); //encrypta las contraseñas
const nodemailer = require("nodemailer"); //verificacion de email
const jwt = require("jsonwebtoken"); //envio de token

const sendEmail = async (email, uniqueString) => {
  //FUNCION ENCARGADA DE ENVIAR EL EMAIL

  const transporter = nodemailer.createTransport({
    //DEFINIMOS EL TRASPORTE UTILIZANDO NODEMAILER
    host: "smtp.gmail.com", //DEFINIMOS LO PARAMETROS NECESARIOS
    port: 465, //587 si es false
    secure: true,
    auth: {
      user: "mindhubbladimir@gmail.com", //DEFINIMOS LOS DATOS DE AUTORIZACION DE NUESTRO PROVEEDOR DE
      pass: "Brs1982+", //COREO ELECTRONICO, CONFIGURAR CUAENTAS PARA PERMIR EL USO DE APPS
    }, //CONFIGURACIONES DE GMAIL
  });

  // EN ESTA SECCION LOS PARAMETROS DEL MAIL
  let sender = "mindhubbladimir@gmail.com";
  let mailOptions = {
    from: sender, //DE QUIEN
    to: email, //A QUIEN
    subject: "User email verification ", //EL ASUNTO Y EN HTML EL TEMPLATE PARA EL CUERPO DE EMAIL Y EL LINK DE VERIFICACION
    html: `<div>
        <h1 style="color:red">  welcome dear friend!!! <h1>
        <h2 style="color:red">Press  <a href=https://mytinerari-rojas.herokuapp.com/api/verify/${uniqueString}>here</a> to confirm your email. Thanks </h2>  
        </div> `,
  };
    transporter.sendMail(mailOptions, function (error, response) {
        //SE REALIZA EL ENVIO
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent");
        }
    });
};

const usersControllers = {
  verifyEmail: async (req, res) => {
    const { uniqueString } = req.params; //EXTRAE EL EL STRING UNICO DEL LINK

    const user = await User.findOne({ uniqueString: uniqueString });
    console.log(user); //BUSCA AL USUARIO CORRESPONDIENTE AL LINK
    if (user) {
      user.emailVerificado = true; //COLOCA EL CAMPO emailVerified en true
      await user.save();
      res.redirect("http://localhost:3000/"); //REDIRECCIONA AL USUARIO A UNA RUTA DEFINIDA
      //return  res.json({success:true, response:"Su email se ha verificado correctamente"})
    } else {
      res.json({
        success: false,
        response: "Your email has not been verified",
      });
    }
  },

  signUpUsers: async (req, res) => {
    let {
      firstName,
      lastName,
      email,
      password,
      photoURL,
      chooseCountry,
      from,
    } = req.body.userData;
    const test = req.body.test;
    try {
      const usuarioExiste = await User.findOne({ email }); //BUSCAR SI EL USUARIO YA EXISTE EN DB

      if (usuarioExiste) {
        console.log(usuarioExiste.from.indexOf(from));
        if (usuarioExiste.from.indexOf(from) !== -1) {
          //INDEXOF = 0 EL VALOR EXISTE EN EL INDICE EQ A TRUE -1 NO EXITE EQ A FALSE
          console.log(
            "resultado de if " + (usuarioExiste.from.indexOf(from) === 0)
          );
          res.json({
            success: false,
            from: "signup",
            message:
              "You have already made your SignUp in this way, please SignIn",
          });
        } else {
          const contraseñaHasheada = bcryptjs.hashSync(password, 10);
          usuarioExiste.from.push(from);
          usuarioExiste.password.push(contraseñaHasheada);
          if (from === "form-Signup") {
            //PORSTERIORMENTE AGREGAREMOS LA VERIFICACION DE EMAIL
            usuarioExiste.uniqueString = crypto.randomBytes(15).toString("hex");
            await usuarioExiste.save();
            await sendEmail(email, usuarioExiste.uniqueString);
            res.json({
              success: true,
              from: "signup", //RESPONDE CON EL TOKEN Y EL NUEVO USUARIO
              message:
                "We sent you an email to validate it, please check your box to complete the signUp and add it to your SignIn ",
            });
          } else {
            usuarioExiste.save();

            res.json({
              success: true,
              from: "signup",
              message: "We add " + from + "to your means to perform signIn",
            });
          } // EN ESTE PUNTO SI EXITE RESPONDE FALSE
        }
      } else {
        //SI EL USUARIO NO EXISTE

        const contraseñaHasheada = bcryptjs.hashSync(password, 10); //LO CREA Y ENCRIPTA LA CONTRASEÑA
        // CREA UN NUEVO OBJETO DE PERSONAS CON SU USUARIO Y CONTRASEÑA (YA ENCRIPTADA)
        const nuevoUsuario = await new User({
          firstName,
          lastName,
          email,
          password: [contraseñaHasheada],
          photoURL,
          chooseCountry,
          uniqueString: crypto.randomBytes(15).toString("hex"),
          emailVerificado: false,
          from: [from],
        });

        //SE LO ASIGNA AL USUARIO NUEVO
        if (from !== "form-Signup") {
          //SI LA PETICION PROVIENE DE CUENTA GOOGLE
          await nuevoUsuario.save();
          res.json({
            success: true,
            from: "signup",
            message: "Congratulations, your user has been created with" + from,
          }); // AGREGAMOS MENSAJE DE VERIFICACION
        } else {
          //PASAR EMAIL VERIFICADO A FALSE
          //ENVIARLE EL E MAIL PARA VERIFICAR
          await nuevoUsuario.save();
          await sendEmail(email, nuevoUsuario.uniqueString);

          res.json({
            success: true,
            from: "sign up",
            message:
              "We sent you an email to validate it, please check your box to complete the signUp ",
          }); // AGREGAMOS MENSAJE DE VERIFICACION
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong try again in a few minutes",
      }); //CAPTURA EL ERROR
    }
  },
  signInUser: async (req, res) => {
    const { email, password, from } = req.body.logedUser;
    try {
      const usuarioExiste = await User.findOne({ email });

      if (!usuarioExiste) {
        // PRIMERO VERIFICA QUE EL USUARIO EXISTA
        res.json({
          success: false,
          message: "Your users have not been registered, signUp",
        });
      } else {
        if (from !== "form-Signup") {
          let contraseñaCoincide = usuarioExiste.password.filter((pass) =>
            bcryptjs.compareSync(password, pass)
          );

          if (contraseñaCoincide.length > 0) {
            //TERERO VERIFICA CONTRASEÑA

            const userData = {
              id: usuarioExiste._id,
              firstName: usuarioExiste.firstName,
              email: usuarioExiste.email,
              photoURL: usuarioExiste.photoURL,
              from: from,
            };
            await usuarioExiste.save();
            const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 24,
            });

            res.json({
              success: true,
              from: from,
              response: { token, userData },
              message: "welcome again " + userData.firstName,
            });
          } else {
            res.json({
              success: false,
              from: from,
              message:
                "You have not registered with " +
                from +
                "If you want to enter with this method you must do the signUp with" +
                from,
            });
          }
        } else {
          if (usuarioExiste.emailVerificado) {
            let contraseñaCoincide = usuarioExiste.password.filter((pass) =>
              bcryptjs.compareSync(password, pass)
            );
            // console.log(contraseñaCoincide)
            console.log(
              "resultado de busqueda de contrasena: " +
                (contraseñaCoincide.length > 0)
            );
            if (contraseñaCoincide.length > 0) {
              const userData = {
                id: usuarioExiste._id,
                firstName: usuarioExiste.firstName,
                email: usuarioExiste.email,
                photoURL: usuarioExiste.photoURL,
                from: usuarioExiste.from,
              };
              const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {
                expiresIn: 60 * 60 * 24,
              });

              res.json({
                success: true,
                from: from,
                response: { token, userData },
                message: "welcome again " + userData.firstName,
              });
            } else {
              res.json({
                success: false,
                from: from,
                message: "The username or password do not match",
              });
            }
          } else {
            res.json({
              success: false,
              from: from,
              message:
                "You have not verified your email, please check your email box to complete your signUp",
            });
          }
        } //SI NO ESTA VERIFICADO
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong try again in a few minutes",
      });
    }
  },
  signOutUser: async (req, res) => {
    const email = req.body.closeuser;
    const user = await User.findOne({ email });
    await user.save();
    res.json({ success: false, message: "ended session" });
  },
  verificarToken: (req, res) => {
    console.log(req.user);
    if (!req.err) {
      res.json({
        success: true,
        response: {
          id: req.user.id,
          firstName: req.user.firstName,
          photoURL: req.user.photoURL,
          email: req.user.email,
          from: "token",
        },
        message: "Bienvenido nuevamente " + req.user.firstName,
      });
    } else {
      res.json({
        success: false,
        message: "Por favor realiza nuevamente signIn",
      });
    }
  },
};
module.exports = usersControllers;
