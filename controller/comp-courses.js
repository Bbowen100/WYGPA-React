var completedCourse = require('../models/comp-course');
const mongoose = require('mongoose');

// get all the completed courses for a specific user
module.exports.receive = function(req, res, next) {
  let user_id = req.user.id;
  completedCourse.findOne({ user_id }, 'courses', (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result.courses);
    next();
  });
};
// create a completed course for a specific user
module.exports.create = function(req, res, next) {
  let user_id = req.user.id;
  let course = req.body.compCourse;
  completedCourse.findOne({ user_id }, (err, result) => {
    if (err) return res.status(500).json(err);
    else if (!err && result) {
      let courses = result.courses;
      courses.push(course);
      result.set({ courses });
      result.save((err, updatedCourse) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(updatedCourse);
        next();
      });
    } else if (!err && !result) {
      let newCourse = {
        user_id: mongoose.Types.ObjectId(user_id),
        courses: [course]
      };
      completedCourse.findOneAndUpdate(
        { user_id },
        newCourse,
        { new: true },
        { upsert: true },
        (err, n_Course) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(n_Course);
          next();
        }
      );
    }
  });
};
// delete a completed course for a specific user
module.exports.delete = function(req, res, next) {
  let user_id = req.user.id;
  let { course_id } = req.query;
  completedCourse.findOne({ user_id }, (err, result) => {
    if (err) return res.status(500).json(err);
    else if (!result)
      return res.status(400).json({ message: 'User Not Found' });
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
  return;
};
