const Ciudades = require("../models/ciudades");
const ciudadesControllers = {
  obtenerCiudades: async (req, res) => {
    let ciudades;
    let error = null;
    try {
      ciudades = await Ciudades.find();
    } catch (err) {
      error = err;
      console.log(error);
    }
    res.json({
      response: error ? "ERROR" : { ciudades },
      success: error ? false : true,
      error: error,
    });
  },
  obtenerUnaCiudad: async (req, res) => {
    const id = req.params.id;
    console.log(req.params);

    let ciudad;
    let error = null;

    try {
      ciudad = await Ciudades.findOne({ _id: id });
      console.log(ciudad);
    } catch (err) {
      error = err;
      console.log(error);
    }
    res.json({
      response: error ? "ERROR" : ciudad,
      success: error ? false : true,
      error: error,
    });
  },
  cargarCiudad: async (req, res) => {
    console.log(req.body);
    const { image, name, country, info } = req.body.dataInput;
    new Ciudades({ image, name, country, info })
      .save()
      .then((respuesta) => res.json({ respuesta }));
  },
  borrarCiudad: async (req, res) => {
    const id = req.params.id;
    await Ciudades.findOneAndDelete({ _id: id }).then((respuesta) =>
      res.json({ respuesta })
    );
  },
  modificarCiudad: async (req, res) => {
    const id = req.params.id;
    const ciudad = req.body.dataInput;

    let ciudadb = await Ciudades.findOneAndUpdate({ _id: id }, ciudad).then(
      (respuesta) => res.json({ respuesta })
    );
    console.log(ciudadb);
  },
};

module.exports = ciudadesControllers;
