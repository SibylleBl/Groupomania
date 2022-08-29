const jsonWebToken = require("jsonwebtoken");
const env = require("dotenv").config();

//middleware qui permet d'extraire les infos du token afin de les transmettre aux autres middlewares:
module.exports = (req, res, next) => {
  // console.log(req);
  try {
    //il faut enlever le next()
    next();
    console.log("try");
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = jsonWebToken.verify(token, process.env.SECRET_TOKEN);
    console.log(decodedToken);
    const userId = decodedToken.userId;
    console.log(userId);

    req.auth = {
      userId: userId,
    };
    console.log("ici2");
    if (req.body.userId && req.body.userId !== userId) {
      console.log("ici3");
      throw "User ID non valable !";
    } else {
      console.log("authentifier");
      next();
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
