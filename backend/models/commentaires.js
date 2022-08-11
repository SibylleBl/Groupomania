const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    posterId: { type: String, required: true },
    pseudo: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("commentaire", commentSchema);
