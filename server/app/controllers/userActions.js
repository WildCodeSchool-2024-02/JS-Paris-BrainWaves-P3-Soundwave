const argon2 = require("argon2");
const jwt = require("jsonwebtoken")
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
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

const readLogin = async (req, res, next) => {
  try {
    const [user] = await tables.user.findByEmail(req.body.email);
    if (user) {
      if (await argon2.verify(user.password, req.body.password)) {
        const token = jwt.sign({id: user.id, role: user.role}, process.env.APP_SECRET, {expiresIn: "1h"})
        delete user.password;
        res.status(200).json({user, token});
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

module.exports = { browse, read, add, readLogin };
