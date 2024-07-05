const express = require("express");

const router = express.Router();
const {
  browse,
  read,
  add,
  readLogin,
  refresh,
  logout,
} = require("../../../controllers/userActions");

router.get("/", browse);
router.post("/", add);
router.get("/refresh", refresh);
router.post("/login", readLogin);
router.get("/logout", logout);
router.get("/:id", read);

module.exports = router;
