const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: [{ type: String, required: true }],
  photoURL: { type: String },
  chooseCountry: { type: String, required: true },
  uniqueString: { type: String, required: true },
  emailVerificado: { type: Boolean, required: true },
  from: { type: Array },
});
const User = mongoose.model("users", usersSchema);
module.exports = User;
