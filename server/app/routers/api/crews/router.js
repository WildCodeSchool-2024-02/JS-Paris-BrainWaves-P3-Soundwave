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

const { isAuth, isAdmin, isCrew } = require("../../../services/auth");
const { add } = require("../../../controllers/eventAction");

const { ValidateForm } = require("../../../services/validateEventForm");

router.get("/", browse);
router.get("/tovalidate", isAuth, isAdmin, readPendingCrews);
router.put("/tovalidate/:id", isAuth, isAdmin, editStatus);
router.get("/:id", read);
router.put("/:id", edit);
router.post("/:id/events/categories", isAuth, isCrew, ValidateForm, add);
router.get("/:id/events", readEventsByCrewId);

module.exports = router;
