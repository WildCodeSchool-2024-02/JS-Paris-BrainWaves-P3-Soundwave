const tables = require("../../database/tables");

const browse = async ({res, next}) => {
  try {
    const events = await tables.event.readAll();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

module.exports = {
    browse,
};
