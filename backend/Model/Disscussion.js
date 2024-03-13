const mongoose = require("mongoose");

const disscussionSchma = new mongoose.Schema({
    subject:{type: String, required: true},
    description: {type: String,required: true },
    status:{type: String}
});

const DisscussionModel = mongoose.model("Disscussion", disscussionSchma);
module.exports = DisscussionModel;