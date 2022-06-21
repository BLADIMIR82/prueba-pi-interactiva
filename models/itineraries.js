const mongoose = require("mongoose");
const itinerariesSchema = new mongoose.Schema({
  titleitinerary: { type: String, required: true },
  userimage: { type: String, required: true },
  username: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  likes: { type: Array },
  hashtag: { type: String, required: true },
  ciudad: { type: String, required: true },
  comments: [
    {
      comment: { type: String },
      userID: { type: mongoose.Types.ObjectId, ref: "users" },
    },
  ],
});

const Itineraries = mongoose.model("itineraries", itinerariesSchema);
module.exports = Itineraries;
