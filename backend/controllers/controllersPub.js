const Publications = require("../models/publications");
const fs = require("fs");
const { error } = require("console");

// -------- CREATION D'UNE NOUVELLE PUBLICATION:

exports.createPublication = (req, res) => {
  const pubObject = req.body;
  delete pubObject._id;
  delete pubObject._userId;

  const publication = new Publications({
    ...pubObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`, // à corriger car image "undefined"
    likes: 0,
    dislikes: 0,
    usersDisliked: [],
    usersLiked: [],
  });

  publication
    .save()
    .then(() => {
      res.status(201).json({ message: "Publication enregistrée !" });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

// -------- MODIFICATION D'UNE PUBLICATION:

exports.modifyPublication = (req, res) => {
  const pubObject = req.file
    ? {
        ...JSON.parse(req.body.publication),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  // console.log(pubObject);

  delete pubObject._userId;

  Publications.findOne({ id: req.params.id })

    .then((publication) => {
      if (publication.userId !== req.auth.userId) {
        // console.log(publication.userId);
        // console.log(req.auth.userId);
        res.status(401).json({ message: "Non-autorisé" });
      } else {
        Publications.updateOne(
          { id: req.params.id },
          { ...pubObject, id: req.params.id }
        )
          .then(() =>
            res.status(200).json({ message: "Publication modifiée !" })
          )
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// -------- SUPRESSION D'UNE PUBLICATION:

exports.deletePublication = (req, res) => {
  Publications.findOne({ _id: req.params.id })
    .then((publication) => {
      if (publication.userId != req.auth.userId) {
        res.status(401).json({ message: "Non-autorisé" });
      } else {
        const filename = publication.imageUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, () =>
          publication
            .deleteOne({ _id: req.params.id })
            .then(() =>
              res.status(200).json({ message: "Publication supprimée !" })
            )
            .catch((error) => res.status(401).json({ error }))
        );
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// -------- JE RECUPERE UNE PUBLICATION SPECIFIQUE:

exports.getOnePublication = (req, res) => {
  Publications.findOne({ id: req.params.id })
    .then((publication) => {
      res.status(200).json(publication);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

// -------- JE RECUPERE TOUTE LES PUBLICATIONS:

exports.getAllPublications = (req, res) => {
  Publications.find()
    .then((allPub) => res.status(200).json(allPub))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPublicationsdev = (req, res) => {
  Publications.find()
    .then((allPub) => res.status(200).json(allPub))
    .catch((error) => res.status(400).json({ error }));
};

// -------- GESTION DES LIKES ET DISLIKES:

exports.likePublication = (req, res) => {
  Publications.findOne({ _id: req.params.id })
    .then((publication) => {
      switch (req.body.like) {
        case -1:
          if (!publication.usersDisliked.includes(req.body.userId)) {
            publication.usersDisliked.push(req.body.userId);
            publication.dislikes++;
          }
          break;

        case 1:
          if (!publication.usersLiked.includes(req.body.userId)) {
            publication.usersLiked.push(req.body.userId);
            publication.likes++;
          }
          break;

        case 0:
          if (publication.usersLiked.includes(req.body.userId)) {
            publication.usersLiked.splice(
              publication.usersLiked.indexOf(req.body.userId),
              1
            );
            publication.likes--;
          }
          if (publication.usersDisliked.includes(req.body.userId)) {
            publication.usersDisliked.splice(
              publication.usersDisliked.indexOf(req.body.userId),
              1
            );
            publication.dislikes--;
          }
          break;

        default:
          break;
      }
      publication
        .save()
        .then(() => {
          res.status(200).json({ message: "Tableau mis à jour" });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
