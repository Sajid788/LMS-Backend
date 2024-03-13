const mongoose = require("mongoose");

const lectureSchma = new mongoose.Schema({
    name: {type: String, required: true},
    creator:{type: String, require:true},
    course:{type: String, enum:["React","Node.js", "Next.js"]},
    url:{type: String, require:true}
})

const LectureModel = mongoose.model("Lecture", lectureSchma);

module.exports = LectureModel;