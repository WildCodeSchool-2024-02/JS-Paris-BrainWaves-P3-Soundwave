const express = require('express');

const router = express.Router();

const {browse, read, readUnvalide, add} = require("../../../controllers/eventAction")

router.get("/", browse);
router.get("/:id", read);
router.get("/tovalidate", readUnvalide);
router.post("/", add)



module.exports = router;