const express = require('express');

const router = express.Router();

const {browse, read, readUnvalide, add, editStatus} = require("../../../controllers/eventAction")

router.get("/", browse);
router.get("/tovalidate", readUnvalide);
router.get("/:id", read);
router.post("/", add);
router.put("/:id", editStatus);



module.exports = router;