const express = require('express');
const router = express.Router();
const compCourseController = require('../controller/comp-courses');
const { jwtAuthentication } = require('../middleware');

router.post('/', jwtAuthentication, compCourseController.create);
router.get('/', jwtAuthentication, compCourseController.receive);
router.delete('/', jwtAuthentication, compCourseController.delete);

module.exports = router;
