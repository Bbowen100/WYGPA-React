var mongoose = require('mongoose');

let compCourseSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  courses: [{ name: String, weight: Number, mark: Number }]
});

module.exports = mongoose.model('compCourse', compCourseSchema);
