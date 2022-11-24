const jsonWebToken = require("jsonwebtoken");
const env = require("dotenv").config();
const user = require("../models/user");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jsonWebToken.verify(token, process.env.SECRET_TOKEN);

    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    const name = decodedToken.name;
    const imageUrl = decodedToken.imageUrl;

    req.auth = {
      userId: userId,
      isAdmin: isAdmin,
      name: name,
      imageUrl: imageUrl,
    };

    if (req.body.userId && req.body.userId !== userId && !isAdmin) {
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
