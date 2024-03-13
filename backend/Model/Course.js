const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String,required: true},
  description: {type: String,required: true },
  fees: { type: Number,required: true},
  duration: {type: Number,required: true}
});

const CourseModel = mongoose.model("Course", courseSchema);

module.exports = CourseModel;
