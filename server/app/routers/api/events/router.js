const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  editStatus,

  readPendingEvents,
  readLastEvents,
  readCategoryEvents,
  readCrewByEvent,
} = require("../../../controllers/eventAction");
const { isAuth, isAdmin } = require("../../../services/auth");

router.get("/", browse);
router.get("/tovalidate", isAuth, isAdmin, readPendingEvents);
router.get("/recent", readLastEvents);
router.get("/category/:style", readCategoryEvents);
router.get("/:id/crew", readCrewByEvent);
router.get("/:id", read);
router.put("/:id", isAuth, isAdmin, editStatus);

module.exports = router;
