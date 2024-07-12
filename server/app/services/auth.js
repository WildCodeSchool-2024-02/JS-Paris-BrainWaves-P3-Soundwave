const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const authorization = req.get("Authorization");
    if (!authorization) throw new Error("Authorization key is missing");
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer")
      throw new Error("Authorization type should be Bearer");
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    req.auth = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.auth.role === "admin") {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(403);
  }
};

const isCrew = async (req, res, next) => {
  try {
    if (req.auth.role === "crew") {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(403);
  }
};

const isClient = async (req, res, next) => {
  try {
    if (req.auth.role === "client") {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(403);
  }
};

module.exports = { isAuth, isAdmin, isCrew, isClient };
