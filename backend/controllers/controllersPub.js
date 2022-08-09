const publications = require("../models/publications");
const fs = require("fs");

// -------- CREATION D'UNE NOUVELLE PUBLICATION:

exports.createPublication = (req, res, next) => {
  console.log(req.body);
  const pubObject = JSON.parse(req.body.publication);
  //on enlève le champs id généré automatiquement par mongo car ce n'est pas le bon:
  delete pubObject._id;
  // je supprime aussi le champs userId de la personne qui a créé l'objet car je ne veux pas faire confiance au client:
  delete pubObject._userId;

  //j'utilise l'userId généré pas le token d'authentification:
  const publication = new publications({
    ...pubObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersDisliked: [],
    usersLiked: [],
  });

  // j'enregistre ce nouvel objet dans la base de données:
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

exports.modifyPublication = (req, res, next) => {
  //Je vérifie d'abord si l'utilisateur a transmit un fichier ou pas:
  // si oui :
  const pubObject = req.file
    ? {
        ...JSON.parse(req.body.publication),
        imageUrl: `${req.protocol}://${req.get("host")}/image/${
          req.file.filename
        }`,
        // si non, je récupère directement l'objet:
      }
    : { ...req.body };

  // même mesure de sécurité qu'au dessus:
  delete pubObject._userId;

  //Je récupère l'objet dans la base de données (afin d'être sûr que c'est l'utilisateur qui a créé l'objet qui cherche à le modifier):
  publications
    .findOne({ _id: req.params.id })
    .then((publication) => {
      //si l'id est différent de celui du token, quelqu'un essaye de modifier un objet qui ne lui appartient pas:
      if (publication.userId != req.auth.userId) {
        res.status(401).json({ message: "Non-autorisé" });
      } else {
        publications
          .updateOne(
            { _id: req.params.id },
            { ...pubObject, _id: req.params.id }
          )
          .then(() =>
            res.status(200).json({ message: "Publication modifiée !" })
          )
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

// -------- SUPRESSION D'UNE PUBLICATION:

exports.deletePublication = (req, res, next) => {
  publications
    .findOne({ _id: req.params.id })
    .then((publication) => {
      //je vérifie encore si c'est bien le propriétaire de l'objet qui demande la suppression:
      if (publication.userId != req.auth.userId) {
        res.status(401).json({ message: "Non-autorisé" });
      } else {
        //je supprime l'objet de la base de données ET l'image du fichier images:
        const filename = publication.imageUrl.split("/images")[1]; //--- emplacement de l'image
        fs.unlink(`images/${filename}`, () =>
          publications
            .deleteOne({ _id: req.params.id })
            .then(() =>
              res.status(200).json({ message: "Publication supprimée !" })
            )
            .catch((error) => res.status(401).json({ error: error }))
        );
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// -------- JE RECUPERE UNE PUBLICATION SPECIFIQUE:

exports.getOnePublication = (req, res, next) => {
  publications
    .findOne({ _id: req.params.id })
    .then((publication) => res.status(200).json(publication))
    .catch((error) => res.status(404).json({ error: error }));
};

// -------- JE RECUPERE TOUTE LES PUBLICATIONS:

exports.getAllPublications = (req, res, next) => {
  publications
    .find()
    .then((allPub) => res.status(200).json(allPub))
    .catch((error) => res.status(400).json({ error: error }));
};

// -------- GESTION DES LIKES ET DISLIKES:

exports.likePublication = (req, res, next) => {
  publications
    .findOne({ _id: req.params.id })
    .then((publication) => {
      switch (req.body.like) {
        case -1:
          //
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
