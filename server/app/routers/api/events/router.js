const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  add,
  editStatus,
  readPendingEvents,
  readCategoryEvents,
} = require("../../../controllers/eventAction");
const { ValidateForm } = require("../../../services/validateEventForm");
const { isAuth, isAdmin } = require("../../../services/auth");

router.get("/", browse);
router.get("/tovalidate", isAuth, isAdmin, readPendingEvents);
router.get("/category/:style", readCategoryEvents);
router.get("/:id", read);
router.put("/:id", isAuth, isAdmin, editStatus);
router.post("/", ValidateForm, add);

module.exports = router;
