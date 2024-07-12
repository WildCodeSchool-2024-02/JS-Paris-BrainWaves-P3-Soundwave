const express = require("express");

const router = express.Router();
const {
  browse,
  read,
  readValidatedEventsByCrewId,
  create,
  readPendingCrews,
  editStatus,
  edit,
  readUnvalidatedEventsByCrewId,
} = require("../../../controllers/crewAction");

const { isAuth, isAdmin, isCrew } = require("../../../services/auth");
const { add } = require("../../../controllers/eventAction");

const { ValidateForm } = require("../../../services/validateEventForm");
const imageUpload = require("../../../services/imageUpload");

router.get("/", browse);
router.get("/tovalidate", isAuth, isAdmin, readPendingCrews);
router.put("/tovalidate/:id", isAuth, isAdmin, editStatus);
router.post("/", isAuth, isCrew, imageUpload.single("image"), create);
router.get("/:id", read);
router.put("/:id", isAuth, isCrew, imageUpload.single("image"), edit);
router.post(
  "/:id/events/categories",
  isAuth,
  isCrew,
  imageUpload.single("image"),
  ValidateForm,
  add
);
router.get("/:id/validated-events", readValidatedEventsByCrewId);
router.get("/:id/unvalidated-events", readUnvalidatedEventsByCrewId);
module.exports = router;
