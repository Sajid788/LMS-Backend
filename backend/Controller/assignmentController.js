const express = require('express');

const authentication = require('../Midleware/authentication');

const AssignmentController = express.Router();

AssignmentController.get('/assignments', authentication(['Admin', 'Student',"Instructor"]), (req,res) =>{
    res.send({msg:'All deta of Assignment'});
});

AssignmentController.post('/assignments', authentication(['Admin',"Instructor"]), (req,res) =>{
    res.send({msg:'Assignment created succesfully'});
});

AssignmentController.patch('/assignments', authentication(['Admin',"Instructor"]), (req,res) =>{
    res.send({msg:'Assignment updated sucessfully'});
});

AssignmentController.delete('/assignments', authentication(['Admin',"Instructor"]), (req,res) =>{
    res.send({msg:'Assignment deleted sucessfully'});
})


module.exports = AssignmentController;