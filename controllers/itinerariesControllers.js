const Itineraries = require("../models/itineraries");

const itinerariesControllers = {
  obtenerItineraries: async (req, res) => {
    let itineraries;
    let error = null;
    try {
      itineraries = await Itineraries.find();
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : { itineraries },
      success: error ? false : true,
      error: error,
    });
  },

  obtenerUnItinerario: async (req, res) => {
    const id = req.params.id;
    console.log(req.params);

    let itinerary;
    let error = null;

    try {
      itinerary = await Itineraries.findOne({ _id: id });
      console.log(itinerary);
    } catch (err) {
      error = err;
      console.log(error);
    }
    res.json({
      response: error ? "ERROR" : itinerary,
      success: error ? false : true,
      error: error,
    });
  },

  cargarItinerario: async (req, res) => {
    const {
      titleitinerary,
      userimage,
      username,
      price,
      likes,
      duration,
      hashtag,
      ciudad,
    } = req.body.dataInput;
    new Itineraries({
      titleitinerary: titleitinerary,
      userimage,
      username,
      price,
      duration,
      likes,
      hashtag,
      ciudad
    })
      .save()

      .then((respuesta) => res.json({ respuesta }));
  },

  borrarItinerario: async (req, res) => {
    const id = req.params.id;

    await Itineraries.findOneAndDelete({ _id: id }).then((respuesta) =>
      res.json({ respuesta })
    );
  },

  modificarItinerario: async (req, res) => {
    const id = req.params.id;
    const Itineraries = req.body.dataInput;

    let itinerariedb = await Itineraries.findOneAndUpdate(
      { _id: id },
      itineraries
    ).then((respuesta) => res.json({ respuesta }));
  },

  likeDislike: async (req, res) => {
    const id = req.params.id; //LLEGA POR PARAMETRO DESDE AXIOS
    const user = req.user.id; //LLEGA POR RESPUESTA DE PASSPORT

    await Itineraries.findOne({ _id: id })

      .then((itinerary) => {
        console.log(itinerary);
        if (itinerary.likes.includes(user)) {
          Itineraries.findOneAndUpdate(
            { _id: id },
            { $pull: { likes: user } },
            { new: true }
          ) //PULL QUITA, SACA
            .then((response) =>
              res.json({ success: true, response: response.likes })
            )
            .catch((error) => console.log(error));
        } else {
          Itineraries.findOneAndUpdate(
            { _id: id },
            { $push: { likes: user } },
            { new: true }
          ) //PUSH AGREGA
            .then((response) =>
              res.json({ success: true, response: response.likes })
            )
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => res.json({ success: false, response: error }));
  },
};

module.exports = itinerariesControllers;
