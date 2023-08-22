const express = require("express");
const { createRemark, getAllRemarks } = require("../controllers/remarkController");
const router = express.Router();

router.get('/:canvasId',getAllRemarks);
router.post('/create',createRemark);

module.exports = router;