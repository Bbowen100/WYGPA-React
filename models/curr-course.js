const mongoose = require('mongoose');

let currCourseSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  courses: [
    {
      name: String,
      weight: Number,
      evals: [{ name: String, weight: Number, mark: Number }]
    }
  ]
});

module.exports = mongoose.model('currCourse', currCourseSchema);
