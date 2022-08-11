const mongoose = require("mongoose");

const publicationsSchema = mongoose.Schema(
  {
    commentId: { type: String, required: true },
    posterId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true, maxlength: 500 },
    imageUrl: { type: String },
    videoUrl: { type: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: [String],
    usersDisliked: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("publication", publicationsSchema);
