const express = require("express");

const router = express.Router();
const {
  browse,
  read,
  readEventsByCrewId,
  readPendingCrews,
  editStatus,
  edit,
} = require("../../../controllers/crewAction");

const { isAuth, isAdmin } = require("../../../services/auth");

router.get("/", browse);
router.get("/tovalidate", isAuth, isAdmin, readPendingCrews);
router.put("/tovalidate/:id", isAuth, isAdmin, editStatus);
router.get("/:id", read);
router.put("/:id", edit);

router.get("/:id/events", readEventsByCrewId);

module.exports = router;
