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
module.exports = { browse, read, edit };
