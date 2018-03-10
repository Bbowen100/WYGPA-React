const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

/* GET users listing. */
router.post('/signup/', userController.create);
router.post('/login/', userController.receive);

module.exports = router;
