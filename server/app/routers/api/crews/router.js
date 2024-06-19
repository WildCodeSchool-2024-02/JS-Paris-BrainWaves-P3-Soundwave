const express = require("express");

const router = express.Router();
const {
  browse,
  read,
  readEventsByCrewId,
  readUnvalide,
} = require("../../../controllers/crewAction");

router.get("/", browse);
router.get("/:id", read);
router.get("/:id/events", readEventsByCrewId);
router.get("/tovalidate", readUnvalide);

module.exports = router;
