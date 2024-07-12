const express = require("express");

const router = express.Router();
const {
  browse,
  read,
  add,
  edit,
  readLogin,
  refresh,
  logout,
  userEventLike,
  eventDeleteLike,
} = require("../../../controllers/userActions");

const {isAuth, isClient} = require("../../../services/auth")
const { ValidateUserForm } = require("../../../services/validateUserAccount");

router.get("/", browse);
router.post("/", add);
router.get("/refresh", refresh);
router.post("/login", readLogin);
router.post("/like", isAuth, isClient, userEventLike);
router.delete("/like", isAuth, isClient, eventDeleteLike);
router.get("/logout", logout);
router.post("/", ValidateUserForm, add);

router.get("/:id", read);
router.put("/:id", edit);

module.exports = router;
