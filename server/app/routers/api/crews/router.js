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
  readByOwnerId,
  readUnvalidatedEventsByCrewId,
} = require("../../../controllers/crewAction");

const { isAuth, isAdmin, isCrew } = require("../../../services/auth");
const { add, deleteEvent } = require("../../../controllers/eventAction");

const { ValidateForm } = require("../../../services/validateEventForm");
const imageUpload = require("../../../services/imageUpload");

router.get("/", browse);
router.get("/tovalidate", isAuth, isAdmin, readPendingCrews);
router.get("/user/:id", readByOwnerId);
router.get("/:id", read);
router.get("/:id/validated-events", readValidatedEventsByCrewId);
router.get("/:id/unvalidated-events", readUnvalidatedEventsByCrewId);
router.put("/:id", isAuth, isCrew, imageUpload.single("image"), edit);
router.put("/tovalidate/:id", isAuth, isAdmin, editStatus);
router.post("/", isAuth, isCrew, imageUpload.single("image"), create);
router.post(
  "/:id/events/categories",
  isAuth,
  isCrew,
  imageUpload.single("image"),
  ValidateForm,
  add
);
router.delete("/:id/events/:id", isAuth, isCrew, deleteEvent);
module.exports = router;
