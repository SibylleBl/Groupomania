const jsonWebToken = require("jsonwebtoken");
const env = require("dotenv").config();

//middleware qui permet d'extraire les infos du token et de les injecter dans une variable auth:
module.exports = (req, res, next) => {
  // console.log(req);
  try {
    //il faut enlever le next()
    // next();
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jsonWebToken.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    req.auth = {
      userId: userId,
    };
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
