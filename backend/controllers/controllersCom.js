const commentaires = require("../models/commentaires");
const publications = require("../models/publications");

// -------- CREATION D'UN NOUVEAU COMMENTAIRE:

exports.createComment = (req, res) => {
  const comObject = JSON.parse(req.body.commentaire);
  delete comObject._id;
  delete comObject._userId;

  const commentaire = new commentaires({
    ...comObject,
  });

  commentaire
    .save()
    .then(() => {
      res.status(201).json({ message: "Commentaire enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
