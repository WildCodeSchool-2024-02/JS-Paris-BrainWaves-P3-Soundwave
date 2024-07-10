const express = require("express");

const router = express.Router();
const {
  browse,
  read,
  readEventsByCrewId,
  create,
  readPendingCrews,
  editStatus,
  edit,
} = require("../../../controllers/crewAction");

const { isAuth, isAdmin, isCrew } = require("../../../services/auth");
const { add } = require("../../../controllers/eventAction");

const { ValidateForm } = require("../../../services/validateEventForm");
const imageUpload = require("../../../services/imageUpload")


router.get("/", browse);
router.get("/tovalidate", isAuth, isAdmin, readPendingCrews);
router.put("/tovalidate/:id", isAuth, isAdmin, editStatus);
router.post("/", create);
router.get("/:id", read);
router.put("/:id", edit);
router.post("/:id/events/categories", isAuth, isCrew, imageUpload.single("image"), ValidateForm, add);
router.get("/:id/events", readEventsByCrewId);

module.exports = router;
