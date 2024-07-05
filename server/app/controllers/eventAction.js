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
    const eventCategories = [];
    req.body.categories.forEach((category) =>
      eventCategories.push([category.value, event])
    );
    const style = await tables.event.addStyleEvent(eventCategories);
    const eventCrewId = await tables.event.addCrewIdEvent(event, req.params.id);
    res.status(201).json(event, eventCrewId, style);
  } catch (error) {
    next(error);
  }
};

const editStatus = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
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

const readLastEvents = async (req, res, next) => {
  try {
    const results = await tables.event.readLast();
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

const readCrewByEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await tables.event.readCrewFromEvent(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  browse,
  read,
  readPendingEvents,
  add,
  readLastEvents,
  editStatus,
  readCategoryEvents,
  readCrewByEvent,
};
