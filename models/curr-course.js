const mongoose = require('mongoose');

let currCourseSchema = new mongoose.Schema({
  user_id: String,
  courses: [
    {
      name: String,
      weight: Number,
      evals: [{ name: String, weight: Number, mark: Number }]
    }
  ]
});

module.exports = mongoose.model('currCourse', currCourseSchema);
