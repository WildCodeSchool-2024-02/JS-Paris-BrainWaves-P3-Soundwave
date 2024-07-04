const tables = require("../../database/tables");

const browse = async ({ res, next }) => {
  try {
    const crews = await tables.crew.readAll();
    res.status(200).json(crews);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const crew = await tables.crew.readOne(id);
    res.status(200).json(crew);
  } catch (error) {
    next(error);
  }
};

const readEventsByCrewId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const events = await tables.crew.readAllEventsFromCrew(id);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

const readPendingCrews = async ({ res, next }) => {
  try {
    const pendingCrews = await tables.crew.readAllPendings();
    res.status(200).json(pendingCrews);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const crew = await tables.crew.edit(req.body, req.params.id);
    if (crew) {
      const crewProfile = await tables.crew.readOne(req.params.id);
      res.status(200).json(crewProfile);
    } else {
      res.status(404);
    }
  } catch (error) {
    next(error);
  }
};

const editStatus = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await tables.crew.edit(body, id);
    const getOne = await tables.crew.readOne(id);
    res.status(200).json(getOne);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  browse,
  read,
  readEventsByCrewId,
  readPendingCrews,
  editStatus,
  edit,
};
