const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  editStatus,
  readPendingEvents,
  readCategoryEvents,
  readCrewByEvent,
} = require("../../../controllers/eventAction");

router.get("/", browse);
router.get("/tovalidate", readPendingEvents);
router.get("/category/:style", readCategoryEvents);
router.get("/:id/crew", readCrewByEvent);
router.get("/:id", read);
router.put("/:id", editStatus);

module.exports = router;
