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
} = require("../../../controllers/userActions");

const { ValidateUserForm } = require("../../../services/validateUserAccount");
const { isAuth, isClient } = require("../../../services/auth");
const imageUpload = require("../../../services/imageUpload")

router.get("/", browse);
router.post("/", ValidateUserForm, add);
router.get("/refresh", refresh);
router.post("/login", readLogin);
router.get("/logout", logout);

router.get("/:id", read);
router.put("/",isAuth, isClient, imageUpload.single("image"), edit);

module.exports = router;
