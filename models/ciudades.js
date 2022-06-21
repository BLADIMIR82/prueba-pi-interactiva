const mongoose = require("mongoose");
const ciudadesSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  info: { type: String, required: true },
});

const Ciudades = mongoose.model("ciudades", ciudadesSchema);
module.exports = Ciudades;
