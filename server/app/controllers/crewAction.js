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

module.exports = { browse, read, readEventsByCrewId };
