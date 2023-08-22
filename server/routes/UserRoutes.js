const express = require("express");
const router = express.Router();
const {test, createUser} = require("../controllers/userController")
router.get('/',test);

router.post('/create',createUser);

module.exports = router;