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
    const userData = req.body;
    const result = await tables.user.insertOne(userData);
    const users = await tables.user.readOne(result.insertId);
    res.status(201).json(users)
  } catch(err) {
    next(err);
  }
};

const readLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [user] = await tables.user.logIn(email, password);
    if (user) res.status(200).json(user);
    else res.sendStatus(400);
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, read, add, readLogin };
