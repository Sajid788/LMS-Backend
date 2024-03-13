const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    title:{type: String, required: true},
    category:{type: String, required: true},
    creator:{type: String, required: true},
    deadline:{type: Date, required: true}
});

const AssignmentModel = mongoose.model('Assignement', assignmentSchema);
module.exports = AssignmentModel;