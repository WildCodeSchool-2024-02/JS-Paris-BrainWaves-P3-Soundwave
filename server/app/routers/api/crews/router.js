const express = require("express");

const router = express.Router();
const {
  browse,
  read,
  readEventsByCrewId,
  readUnvalide,
  editStatus
} = require("../../../controllers/crewAction");

router.get("/", browse);
router.get("/tovalidate", readUnvalide);
router.get("/:id", read);
router.get("/:id/events", readEventsByCrewId);
router.put("/:id", editStatus)

module.exports = router;
