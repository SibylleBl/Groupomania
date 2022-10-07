const mongoose = require("mongoose");

const publicationsSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    username: { type: String },
    title: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String },
    likes: { type: Number, default: 0 },
    usersLiked: [String],
    createdAt: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("publication", publicationsSchema);
