const express = require("express");

const router = express.Router();
const {
  browse,
  read,
  add,
  readLogin,
  refresh,
  logout
} = require("../../../controllers/userActions");

router.get("/", browse);
router.get("/refresh", refresh);
router.get("/logout", logout);
router.get("/:id", read);
router.post("/", add);
router.post("/login", readLogin);

module.exports = router;
