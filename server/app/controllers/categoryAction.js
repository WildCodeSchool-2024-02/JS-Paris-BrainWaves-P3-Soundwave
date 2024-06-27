const tables = require("../../database/tables");

const browse = async ({ res, next }) => {
    try {
      const category = await tables.category.readCategory();
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    browse,
  }