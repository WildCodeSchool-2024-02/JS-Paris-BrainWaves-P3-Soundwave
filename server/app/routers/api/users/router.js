const express = require("express");

const router = express.Router();
const {
  browse,
  read,
  add,
  edit,
  readLogin,
  refresh,
  logout
} = require("../../../controllers/userActions");

const { ValidateUserForm } = require("../../../services/validateUserAccount");

router.get("/", browse);
router.get("/refresh", refresh);
router.get("/logout", logout);
router.post("/", ValidateUserForm, add);
router.post("/login", readLogin);

router.get("/:id", read);
router.put("/:id", edit);

module.exports = router;
