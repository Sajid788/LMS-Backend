const express = require('express');

const authentication = require('../Midleware/authentication');

const DisscussionController = express.Router();

DisscussionController.get('/disscussions', authentication(['Admin', 'Student',"Instructor"]), (req,res) =>{
    res.send({msg:'All deta of Disscussion'});
});

DisscussionController.post('/disscussions', authentication(['Admin','Student',"Instructor"]), (req,res) =>{
    res.send({msg:'Disscussion created succesfully'});
});

DisscussionController.patch('/disscussions', authentication(['Admin',"Instructor"]), (req,res) =>{
    res.send({msg:'Disscussion updated sucessfully'});
});

DisscussionController.delete('/disscussions', authentication(['Admin',"Instructor"]), (req,res) =>{
    res.send({msg:'Disscussion deleted sucessfully'});
})


module.exports = DisscussionController;