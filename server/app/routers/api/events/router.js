const express = require('express');

const router = express.Router();

const {browse, read, add, readCategoryEvents, readCrewByEvent} = require("../../../controllers/eventAction")
const { ValidateForm } = require("../../../services/validateEventForm")

router.get("/", browse);
router.get("/category/:genre", readCategoryEvents);
router.get("/:id/crew", readCrewByEvent);
router.get("/:id", read);
router.post("/", ValidateForm, add)



module.exports = router;