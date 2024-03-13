const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Id : { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Student'] },
    courses:{type:String, enum:["React", "Node.js", "Next.js"]}
});

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;


