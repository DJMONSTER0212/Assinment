const express = require("express");
const { createCanvas, getCanvas, getAllCanvas } = require("../controllers/canvasController");
const router = express.Router();

router.get('/:userId/:canvasId',getCanvas)
router.get('/:userId',getAllCanvas)
router.post('/create',createCanvas)

module.exports = router;