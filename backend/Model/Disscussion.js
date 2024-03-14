const mongoose = require("mongoose");

const disscussionSchma = new mongoose.Schema({
    title:{type: String, required: true},
    description: {type: String,required: true },
    createrId:{type:mongoose.Types.ObjectId, required:true},
    status:{type: String, enum:["Pending", "Resolved", "Reopened"]}
});

const DisscussionModel = mongoose.model("Disscussion", disscussionSchma);
module.exports = DisscussionModel;