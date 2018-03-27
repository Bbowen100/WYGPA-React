const currentCourse = require('../models/curr-course');
const mongoose = require('mongoose');

// add an evalutation for a specific course
module.exports.addEval = function(req, res, next) {
  let { course_id, eval } = req.body;
  let user_id = req.user.id;
  //look for the user's list of curr_courses
  currentCourse.findOne({ user_id }, 'courses', (err, result) => {
    if (err) return res.status(500).json(err);
    let index = result.courses.findIndex(course => course._id == course_id);
    if (index < 0) return res.status(400).json({ message: 'Course Not Found' });
    let courses = result.courses;
    courses[index].evals.push(eval);
    result.set({ courses });
    result.save((err, updatedEvals) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(updatedEvals);
      next();
    });
  });
};
// send list of evals for a specific course
module.exports.getEvals = function(req, res, next) {
  let { course_id } = req.query;
  let user_id = req.user.id;
  //look for the user's list of comp_courses
  currentCourse.findOne({ user_id }, 'courses', (err, result) => {
    if (err) return res.status(500).json(err);
    let index = result.courses.findIndex(course => course._id == course_id);
    if (index < 0) res.status(400).json({ message: 'Course Not Found' });
    let evals = result.courses[index].evals;
    return res.status(200).json(evals);
  });
};
// delete a specifc evaluation for a specific course
module.exports.delEval = function(req, res, next) {
  let { course_id, eval_id } = req.query;
  let user_id = req.user.id;
  currentCourse.findOne({ user_id }, 'courses', (err, result) => {
    if (err) return res.status(500).json(err);
    let c_index = result.courses.findIndex(course => course._id == course_id);
    let e_index = result.courses[c_index].evals.findIndex(
      eval => eval._id == eval_id
    );
    if (c_index < 0 || e_index < 0)
      return res
        .status(400)
        .json({ message: 'Course or Evaluation Not Found' });
    let courses = result.courses;
    courses[c_index].evals.splice(e_index, 1);
    result.set({ courses });
    result.save((err, updateEvals) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(updateEvals);
      next();
    });
  });
};
//send the user's list of current courses
module.exports.receive = function(req, res, next) {
  let user_id = req.user.id;
  currentCourse.findOne({ user_id }, 'courses', (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result.courses);
    next();
  });
};
//append a new course to a user's list of current courses
module.exports.create = function(req, res, next) {
  console.log(
    'a post request was made to /api/curr-course, body is: ',
    req.body.currCourse
  );
  let course = req.body.currCourse;
  let user_id = req.user.id;
  currentCourse.findOne({ user_id }, (err, result) => {
    if (!err && result) {
      let courses = result.courses;
      courses.push(course);
      result.set({ courses });
      result.save((err, updatedCourse) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(updatedCourse);
        next();
      });
    } else if (!result && !err) {
      var newCourse = {
        user_id: mongoose.Types.ObjectId(user_id),
        courses: [course]
      };
      currentCourse.findOneAndUpdate(
        { user_id },
        newCourse,
        { upsert: true },
        (err, n_Course) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(n_Course);
          next();
        }
      );
    } else {
      return res.status(500).json(err);
      next();
    }
  });
};
// delete a specific course from ther's list of courses
module.exports.delete = function(req, res, next) {
  let user_id = req.user.id;
  let { course_id } = req.query;
  currentCourse.findOne({ user_id }, 'courses', (err, result) => {
    if (err) return res.status(500).json(err);
    let courses = result.courses;
    let c_index = courses.findIndex(course => course._id == course_id);
    if (c_index < 0)
      return res.status(400).json({ message: 'Course Not Found' });
    courses.splice(c_index, 1);
    result.set({ courses });
    result.save((err, updatedCourses) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(updatedCourses);
      next();
    });
  });
};
