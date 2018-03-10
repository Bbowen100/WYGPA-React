var mongoose = require('mongoose');

let compCourseSchema = new mongoose.Schema({
  user_id: String,
	courses: [ {name: String, weight: Number, mark: Number} ]
});

module.exports = mongoose.model('compCourse', compCourseSchema);
