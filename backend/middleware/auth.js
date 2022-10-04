const jsonWebToken = require("jsonwebtoken");
const env = require("dotenv").config();
const user = require("../models/user");

//middleware qui permet d'extraire les infos du token et de les injecter dans une variable auth:
module.exports = (req, res, next) => {
  // console.log(req);
  try {
    //il faut enlever le next()
    // next();
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jsonWebToken.verify(token, process.env.SECRET_TOKEN);
    console.log("🚀 ~ file: auth.js ~ line 13 ~ decodedToken", decodedToken);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    console.log("🚀 ~ file: auth.js ~ line 15 ~ admin", isAdmin);

    console.log("🚀 ~ file: auth.js ~ line 13 ~ userId", userId);

    req.auth = {
      userId: userId,
      isAdmin: isAdmin,
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
