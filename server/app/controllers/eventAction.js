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

const add = async (req, res, next) => {
  try {
    const event = await tables.event.create(req.body);
    const crewId = await tables.event.readCrewId(req.body);
    const eventCrewId = await tables.event.addCrewIdEvent(req.body)
    res.status(201).json(event, crewId, eventCrewId);
  } catch (error) {
    next(error);
  }
};

const readCategoryEvents = async (req, res, next) => {
  try {
    const [results] = await tables.event.readCategory(req.params.genre);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

const readCrewByEvent = async (req, res , next) => {
  try {
    const {id} =req.params
    const result = await tables.event.readCrewFromEvent(id)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  browse,
  read,
  add,
  readCategoryEvents,
  readCrewByEvent,
};
