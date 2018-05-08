const currentCourse = require('../models/curr-course');
const mongoose = require('mongoose');

//send the user's list of current courses
module.exports.receive = function(req, res, next) {
  let user_id = req.user.id;
  currentCourse
    .findOne({ user_id })
    .then(result => {
      if (!result) {
        return res.status(202).json(result);
      } else {
        return res.status(200).json(result);
      }
      next();
    })
    .catch(err => {
      res.status(300).json(err);
    });
};
//append a new course to a user's list of current courses
module.exports.create = function(req, res, next) {
  let course = req.body.currCourse;
  let user_id = req.user.id;
  currentCourse
    .findOne({ user_id })
    .then(result => {
      if (!result) {
        var newCourse = {
          user_id: mongoose.Types.ObjectId(user_id),
          courses: [course]
        };
        currentCourse
          .findOneAndUpdate({ user_id }, newCourse, { new: true, upsert: true })
          .then(n_Course => {
            return res.status(200).json(n_Course);
          })
          .catch(err => {
            return res.status(500).json(err);
          });
      }
      let courses = result.courses;
      courses.push(course);
      result.set({ courses });
      result
        .save()
        .then(updatedCourse => {
          return res.status(200).json(updatedCourse);
        })
        .catch(err => {
          return res.status(500).json(err);
        });
    })
    .catch(err => {
      return res.status(404).json(err);
    });
};
// delete a specific course from ther's list of courses
module.exports.delete = function(req, res, next) {
  let user_id = req.user.id;
  let { course_id } = req.query;
  currentCourse
    .findOne({ user_id }, 'courses')
    .then(result => {
      let courses = result.courses;
      let c_index = courses.findIndex(course => course._id == course_id);
      if (c_index < 0)
        return res.status(400).json({ message: 'Course Not Found' });

      courses.splice(c_index, 1);
      result.set({ courses });
      result
        .save()
        .then(updatedCourses => {
          return res.status(200).json(updatedCourses);
        })
        .catch(err => {
          return res.status(500).json(err);
        });
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};

// add an evalutation for a specific course
module.exports.addEval = function(req, res, next) {
  let { course_id, eval } = req.body;
  let user_id = req.user.id;
  //look for the user's list of curr_courses
  currentCourse
    .findOne({ user_id }, 'courses')
    .then(result => {
      let index = result.courses.findIndex(course => course._id == course_id);
      if (index < 0)
        return res.status(400).json({ message: 'Course Not Found' });
      let courses = result.courses;
      courses[index].evals.push(eval);
      result.set({ courses });
      result
        .save()
        .then(updatedEvals => {
          return res.status(200).json(updatedEvals);
        })
        .catch(err => {
          return res.status(500).json(err);
        });
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};
// send list of evals for a specific course
module.exports.getEvals = function(req, res, next) {
  let { course_id } = req.query;
  let user_id = req.user.id;
  //look for the user's list of comp_courses
  currentCourse
    .findOne({ user_id }, 'courses')
    .then(result => {
      let index = result.courses.findIndex(course => course._id == course_id);
      if (index < 0)
        return res.status(400).json({ message: 'Course Not Found' });
      let evals = result.courses[index].evals;
      return res.status(200).json(evals);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};
// delete a specifc evaluation for a specific course
module.exports.delEval = function(req, res, next) {
  let { course_id, eval_id } = req.query;
  let user_id = req.user.id;
  currentCourse
    .findOne({ user_id }, 'courses')
    .then(result => {
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
      result
        .save()
        .then(updateEvals => {
          return res.status(200).json(updateEvals);
        })
        .catch(err => {
          return res.status(500).json(err);
        });
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};
