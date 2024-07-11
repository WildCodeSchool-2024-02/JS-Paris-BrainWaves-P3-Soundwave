const express = require("express");

const router = express.Router();
const {
  browse,
  read,
  add,
  readLogin,
  refresh,
  logout,
  userEventLike,
  eventDeleteLike,
} = require("../../../controllers/userActions");

const {isAuth, isClient} = require("../../../services/auth")

router.get("/", browse);
router.get("/refresh", refresh);
router.get("/logout", logout);
router.get("/:id", read);
router.post("/", add);
router.post("/login", readLogin);
router.post("/like", isAuth, isClient, userEventLike)
router.delete("/like", isAuth, isClient, eventDeleteLike)

module.exports = router;
