const Activities = require("../models/activities");

const ActivitiesController = {
  obtenerActivities: async (req, res) => {
    let activities;
    let error = null;
    try {
      activities = await Activities.find();
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : { activities },
      success: error ? false : true,
      error: error,
    });
  },

  obtenerUnActivities: async (req, res) => {
    const id = req.params.id;
    console.log(req.params);

    let activities;
    let error = null;

    try {
      activities = await Activities.findOne({ _id: id });
      console.log(activities);
    } catch (err) {
      error = err;
      console.log(error);
    }
    res.json({
      response: error ? "ERROR" : activities,
      success: error ? false : true,
      error: error,
    });
  },

  cargarActivities: async (req, res) => {
    console.log(req.body);
    const {
      tittle1,
      imageactivity1,
      tittle2,
      imageactivity2,
      tittle3,
      imageactivity3,
      itinerary,
    } = req.body.dataInput;
    new Activities({
      tittle1,
      imageactivity1,
      tittle2,
      imageactivity2,
      tittle3,
      imageactivity3,
      itinerary,
    })
      .save()
      .then((respuesta) => res.json({ respuesta }));
  },

  borrarActivities: async (req, res) => {
    const id = req.params.id;

    await Activities.findOneAndDelete({ _id: id }).then((respuesta) =>
      res.json({ respuesta })
    );
  },

  modificarActivities: async (req, res) => {
    const id = req.params.id;
    const activities = req.body.dataInput;

    let activitiesdb = await Activities.findOneAndUpdate(
      { _id: id },
      activities
    ).then((respuesta) => res.json({ respuesta }));
  },

  obtenerActividadporItinerario: async (req, res) => {
    try {
      let activities;
      const id = req.params.id;
      try {
        activities = await Activities.find({ itinerary: id });
      } catch (error) {
        console.log(error);
      }
      res.json({ respuesta: activities, success: true });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = ActivitiesController;
