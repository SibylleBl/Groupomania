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
        imageUrl: `${req.protocol}://${req.get("host")}/image/${
          req.file.filename
        }`,
        password: hash,
      });

      newUser
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => {
          console.log(newUser);
          res.status(400).json({ error: error });
        });
    })
    .catch((error) => {
      console.log(req);
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
                token: jsonWebToken.sign(
                  { userId: user._id },
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

exports.getOneUser = (req, res) => {
  User.findOne({ id: req.body.userId }) // à corriger
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

exports.getMe = (req, res) => {
  User.findOne({ id: req.auth.userId })
    .then((user) => res.status(200).json({ user: user }))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((allUsers) => res.status(200).json(allUsers))
    .catch((error) => res.status(400).json({ error: error }));
};
