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
  userCrewFollow,
  crewDeleteFollow,
  allCrewFollow,
} = require("../../../controllers/userActions");

const {isAuth, isClient} = require("../../../services/auth")
const { ValidateUserForm } = require("../../../services/validateUserAccount");
const imageUpload = require("../../../services/imageUpload")

router.get("/", browse);
router.post("/", ValidateUserForm, add);
router.get("/refresh", refresh);
router.post("/login", readLogin);
router.post("/like", isAuth, isClient, userEventLike);
router.delete("/like", isAuth, isClient, eventDeleteLike);
router.get("/follow", isAuth, isClient, allCrewFollow);
router.post("/follow", isAuth, isClient, userCrewFollow);
router.delete("/follow", isAuth, isClient, crewDeleteFollow);
router.get("/logout", logout);

router.get("/:id", read);
router.put("/",isAuth, isClient, imageUpload.single("image"), edit);

module.exports = router;
