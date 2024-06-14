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

module.exports = {
  browse,
  read,
};
