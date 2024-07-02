const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  add,
  readCategoryEvents,
} = require("../../../controllers/eventAction");
const { ValidateForm } = require("../../../services/validateEventForm");

router.get("/", browse);
router.get("/category/:style", readCategoryEvents);
router.get("/:id", read);
router.post("/", ValidateForm, add);

module.exports = router;
