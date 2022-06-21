const Router = require("express").Router();
const validator = require("../config/validator");
const passport = require("../config/passport");
const activitiesControllers = require("../controllers/activitiesControllers");
const commentsControllers = require("../controllers/commentsControllers.js");
const ciudadesControllers = require("../controllers/ciudadesControllers");
const itinerariesControllers = require("../controllers/itinerariesControllers");
const usersControllers = require("../controllers/userControllers");

////////////////////////////////Controlers Ciudades//////////////////////
const {
  obtenerCiudades,
  obtenerUnaCiudad,
  cargarCiudad,
  borrarCiudad,
  modificarCiudad,
} = ciudadesControllers;

Router.route("/allcities").get(obtenerCiudades).post(cargarCiudad);

Router.route("/allcities/:id")
  .delete(borrarCiudad)
  .put(modificarCiudad)
  .get(obtenerUnaCiudad);

/////////////////////////////////////////////controllers of itireries///////////////////////////////

const {
  obtenerItineraries,
  obtenerUnItinerario,
  cargarItinerario,
  borrarItinerario,
  modificarItinerario,
  likeDislike,
} = itinerariesControllers;

Router.route("/allitineraries").get(obtenerItineraries).post(cargarItinerario);

Router.route("/allitineraries/:id")
  .delete(borrarItinerario)
  .put(modificarItinerario)
  .get(obtenerUnItinerario);

Router.route("/likeDislike/:id").put(
  passport.authenticate("jwt", { session: false }),
  likeDislike
);

/////////////////////////////////////////////controllers of users///////////////////////////////


const { signUpUsers, signInUser, signOutUser, verifyEmail, verificarToken } =
  usersControllers;

Router.route("/auth/signUp").post(validator, signUpUsers);

Router.route("/auth/signIn").post(signInUser);

Router.route("/auth/signOut").post(signOutUser);

Router.route("/verify/:uniqueString") //RECIBE EL LINK DE USUARIO
  .get(verifyEmail);

Router.route("/auth/signInToken").get(
  passport.authenticate("jwt", { session: false }),
  verificarToken
);

///////////////////////////////////////controllers activities////////////////////////////////////
const {
  obtenerActivities,
  cargarActivities,
  borrarActivities,
  modificarActivities,
  obtenerUnActivities,
  obtenerActividadporItinerario,
} = activitiesControllers;

Router.route("/allactivities").get(obtenerActivities).post(cargarActivities);

Router.route("/allactivities/:id")
  .delete(borrarActivities)
  .put(modificarActivities)
  .get(obtenerUnActivities);

Router.route("/allactivities/itinerary/:id").get(obtenerActividadporItinerario);

/////////////////////////////controllers comments/////////////////////////////////////

const { addComment, modifiComment, deleteComment } = commentsControllers;

Router.route("/itinerary/comment")
  .post(passport.authenticate("jwt", { session: false }), addComment)
  .put(passport.authenticate("jwt", { session: false }), modifiComment);

Router.route("/itinerary/comment/:id").post(
  passport.authenticate("jwt", { session: false }),
  deleteComment
);

module.exports = Router;
