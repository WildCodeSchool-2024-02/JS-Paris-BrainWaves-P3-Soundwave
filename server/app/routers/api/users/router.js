const express = require("express");

const router = express.Router();
const {
  browse,
  read,
  add,
  readLogin,
} = require("../../../controllers/userActions");

const { ValidateUserForm } = require("../../../services/validateUserAccount");

router.get("/", browse);
router.get("/:id", read);
router.post("/",ValidateUserForm, add);
router.post("/login", readLogin);

module.exports = router;
