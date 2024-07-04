const express = require("express");

const router = express.Router();
const {
  browse,
  read,
  edit,
  readEventsByCrewId,
  create,
} = require("../../../controllers/crewAction");

router.get("/", browse);
router.get("/:id", read);
router.put("/:id", edit);
router.put("/", create);

router.get("/:id/events", readEventsByCrewId);

module.exports = router;
