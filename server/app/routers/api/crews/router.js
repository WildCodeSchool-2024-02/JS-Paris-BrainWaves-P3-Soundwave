const express = require("express");

const router = express.Router();
const {
  browse,
  read,
  readEventsByCrewId,
  readUnvalide,
  editStatus,
  edit
} = require("../../../controllers/crewAction");

router.get("/", browse);
router.get("/tovalidate", readUnvalide);
router.get("/:id", read);
router.put("/:id", edit);
router.put("/:id", editStatus)

router.get("/:id/events", readEventsByCrewId);

module.exports = router;
