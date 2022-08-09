const mongoose = require("mongoose");

const publicationsSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: [String],
  usersDisliked: [String],
  userId: { type: String, required: true },
});

module.exports = mongoose.model("publication", publicationsSchema);
