const express = require("express");
const authentication = require("../Midleware/authentication");
const CourseModel = require("../Model/Course");

const CourseController = express.Router();

CourseController.get('/courses', authentication(['Admin', 'Student',"Instructor"]), async(req,res) =>{
 try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 8;

    let query = {};

   // filter
   
   if(req.query.course){
    query.course = req.query.course;
 }
 } catch (error) {
    console.log(error)
 }
});

CourseController.post('/courses', authentication(['Admin',"Instructor"]), (req,res) =>{
    res.send({msg:'course created succesfully'});
});

CourseController.patch('/courses', authentication(['Admin',"Instructor"]), (req,res) =>{
    res.send({msg:'course updated sucessfully'});
});

CourseController.delete('/courses', authentication(['Admin',"Instructor"]), (req,res) =>{
    res.send({msg:'course deleted sucessfully'});
})


module.exports = CourseController;