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

const readValidatedEventsByCrewId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const events = await tables.crew.readValidatedEventsFromCrew(id);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

const readUnvalidatedEventsByCrewId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const events = await tables.crew.readUnvalidatedEventsFromCrew(id);
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
  const uploadDest = `${process.env.APP_HOST}/upload/`;
  if (req.file) req.body.image = uploadDest + req.file.filename;
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

const create = async (req, res, next) => {
  const uploadDest = `${process.env.APP_HOST}/upload/`;
  if (req.file) req.body.image = uploadDest + req.file.filename;

  try {
    const crewData = req.body;
    const result = await tables.crew.insertOne(crewData);
    const crewCategories = [];
    JSON.parse(req.body.categories).forEach((category) => 
    crewCategories.push([category.value, result.insertId])
    )
    const styleCrew = await tables.crew.addStyleCrew(crewCategories)
    res.status(201).json({result:result.insertId, styleCrew});
  } catch (error) {
    next(error);
  }
};

const readByOwnerId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const crew = await tables.crew.findByOwnerId(id);
    res.status(200).json(crew);
  } catch (error) {
    next(error);
  }
};

const editStatus = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await tables.crew.edit(body, id);
    const get = await tables.crew.readOne(id);
    res.status(200).json(get);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  browse,
  read,
  readValidatedEventsByCrewId,
  readPendingCrews,
  editStatus,
  edit,
  create,
  readUnvalidatedEventsByCrewId,
  readByOwnerId,
};
