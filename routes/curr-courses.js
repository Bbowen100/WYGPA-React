const express = require('express');
const router = express.Router();
const currCourseController = require('../controller/curr-courses');
const { jwtAuthentication } = require('../middleware');

router.post('/', jwtAuthentication, currCourseController.create);
router.get('/', jwtAuthentication, currCourseController.receive);
router.delete('/', jwtAuthentication, currCourseController.delete)
router.post('/evals', jwtAuthentication, currCourseController.addEval);
router.get('/evals', jwtAuthentication, currCourseController.getEvals);
router.delete('/evals', jwtAuthentication, currCourseController.delEval);
module.exports = router;
