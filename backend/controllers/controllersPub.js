const Publications = require("../models/publications");
const fs = require("fs");
const { error } = require("console");
const user = require("../models/user");
const date = new Date("<YYYY-mm-ddTHH:MM:ss>");

// -------- CREATION D'UNE NOUVELLE PUBLICATION:

exports.createPublication = (req, res) => {
  const pubObject = req.body;
  delete pubObject._id;
  delete pubObject._userId;

  const publication = new Publications({
    ...pubObject,
    userId: req.auth.userId,
    username: req.auth.name,
    userImg: req.auth.imageUrl,

    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    usersLiked: [],
    createAt: "",
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
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete pubObject._userId;

  Publications.findOne({ _id: req.params.id })

    .then((publication) => {
      if (publication.userId !== req.auth.userId && !req.auth.isAdmin) {
        res.status(401).json({ message: "Non-autorisé" });
      } else {
        Publications.updateOne(
          { _id: req.params.id },
          {
            ...pubObject,
            id: req.params.id,
          }
        )

          .then((newPublication) => {
            console.log(
              "🚀 ~ file: controllersPub.js ~ line 67 ~ .then ~ newPublication",
              newPublication
            );
            return res.status(200).json(newPublication);
          })
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
      if (publication.userId != req.auth.userId && !req.auth.isAdmin) {
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
  Publications.findOne({ _id: req.params.id })
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
    .sort({ createdAt: -1 })

    .then((allPub) => {
      res.status(200).json(allPub);
    })
    .catch((error) => res.status(400).json({ error }));
};

// -------- GESTION DES LIKES:

exports.likePublication = (req, res) => {
  Publications.findOne({ _id: req.params.id })

    .then((publication) => {
      if (!publication.usersLiked.includes(req.auth.userId)) {
        publication.usersLiked.push(req.auth.userId);
        publication.likes++;
      } else if (publication.usersLiked.includes(req.auth.userId)) {
        publication.usersLiked = publication.usersLiked.filter((monlike) => {
          publication.usersLiked !== monlike;
        });
        publication.likes--;
      }
      Publications.findOneAndUpdate(
        { _id: req.params.id },
        {
          likes: publication.likes,
          usersLiked: publication.usersLiked,
        },
        { returnNewDocument: true }
      )

        .then((newPublication) => {
          console.log(
            "🚀 ~ file: controllersPub.js ~ line 165 ~ .then ~ newPublication",
            newPublication
          );
          res.status(200).json(newPublication);
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
