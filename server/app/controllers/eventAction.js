const tables = require("../../database/tables");

const browse = async ({ res, next }) => {
  try {
    const events = await tables.event.readCurrent();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await tables.event.readOne(id);
    if (event) {
      res.json(event);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const readPendingEvents = async ({ res, next }) => {
  try {
    const pendingEvents = await tables.event.readAllPendings();
    res.status(200).json(pendingEvents);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const event = await tables.event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

const editStatus = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req.body;
  try {
    await tables.event.edit(body, id);
    const getOne = await tables.event.readOne(id);
    res.status(200).json(getOne);
  } catch (error) {
    next(error);
  }
};
const readCategoryEvents = async (req, res, next) => {
  try {
    const [results] = await tables.event.readCategory(req.params.style);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  read,
  readPendingEvents,
  add,
  editStatus,
  readCategoryEvents,
};
