const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const browse = async ({ res, next }) => {
  try {
    const users = await tables.user.readAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await tables.user.readOne(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const hash = await argon2.hash(req.body.password);
    req.body.password = hash;
    const userData = req.body;
    const result = await tables.user.insertOne(userData);
    const users = await tables.user.readOne(result.insertId);
    const token = jwt.sign(
      { id: users.id, role: users.role },
      process.env.APP_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ users, token });
  } catch (err) {
    next(err);
  }
};

const readLogin = async (req, res, next) => {
  try {
    const [user] = await tables.user.findByEmail(req.body.email);
    if (user) {
      if (await argon2.verify(user.password, req.body.password)) {
        const accessToken = jwt.sign(
          { id: user.id, role: user.role },
          process.env.APP_SECRET,
          { expiresIn: "1h" }
        );
        const refreshToken = jwt.sign(
          { id: user.id, role: user.role },
          process.env.APP_SECRET,
          { expiresIn: "1d" }
        );
        delete user.password;
        res
          .status(200)
          .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
          })
          .header("Authorization", accessToken)
          .json(user);
      } else {
        res.status(400).json("Wrong Credentials");
      }
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.status(401).json("Access Denied. No refresh token provided");
    }
    const decoded = jwt.verify(refreshToken, process.env.APP_SECRET);
    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.APP_SECRET,
      { expiresIn: "1h" }
    );
    const user = await tables.user.readOne(decoded.id);
    delete user.password;

    res.header("Authorization", accessToken).json(user);
  } catch (error) {
    next(error);
  }
};

const logout = async ({ res }) => {
  res.clearCookie("refreshToken").sendStatus(200);
};

const userEventLike = async (req, res, next) => {
  try {
    const result = await tables.user.userEventLike(req.params.id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  read,
  add,
  readLogin,
  refresh,
  logout,
  userEventLike,
};
