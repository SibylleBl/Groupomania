const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const jsonWebToken = require("jsonwebtoken");
const env = require("dotenv").config();

exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        password: hash,
      });

      newUser
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => {
          // console.log(newUser);
          res.status(400).json({ error: error });
        });
    })
    .catch((error) => {
      // console.log(req);
      res.status(500).json({ error: error });
    });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe incorrecte" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: "Paire identifiant/mot de passe incorrecte" });
            } else {
              res.status(200).json({
                userId: user._id,
                name: user.name,
                email: user.email,
                imageUrl: user.imageUrl,
                isAdmin: user.isAdmin,
                token: jsonWebToken.sign(
                  {
                    userId: user._id,
                    isAdmin: user.isAdmin,
                    name: user.name,
                    imageUrl: user.imageUrl,
                  },
                  process.env.SECRET_TOKEN,
                  { expiresIn: "24h" }
                ),
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.modifyUser = (req, res) => {
  const userObject = req.file
    ? {
        ...req.body.user,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete userObject._userId;

  User.findOne({ _id: req.body.userId })

    .then(() => {
      User.updateOne(
        { id: req.params.id },
        { ...userObject, id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Profil mis à jour!" }))
        .catch((error) => res.status(401).json({ error }));
    })

    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneUser = (req, res) => {
  User.findOne({ _id: req.body.userId }) // à corriger
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

exports.getMe = (req, res) => {
  // console.log(req.auth.userId);
  User.findOne({ _id: req.auth.userId })
    .then((user) => {
      // console.log(user);
      res.status(200).json({ user: user });
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((allUsers) => res.status(200).json(allUsers))
    .catch((error) => res.status(400).json({ error: error }));
};
