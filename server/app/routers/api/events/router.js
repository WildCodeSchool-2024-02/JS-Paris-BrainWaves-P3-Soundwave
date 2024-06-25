const express = require('express');

const router = express.Router();

const {browse, read, add, editStatus, readUnvalide} = require("../../../controllers/eventAction")
const { ValidateForm } = require("../../../services/validateEventForm")

router.get("/", browse);
router.get("/tovalidate", readUnvalide);
router.get("/:id", read);
router.put("/:id", editStatus);
router.post("/", ValidateForm, add)



module.exports = router;