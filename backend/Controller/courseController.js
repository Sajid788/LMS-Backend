const express = require("express");
const authentication = require("../Midleware/authentication");
const CourseModel = require("../Model/Course");

const CourseController = express.Router();

CourseController.get("/courses",async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 8;

      let query = {};

      // filter
      if (req.query.name) {
        query.course = req.query.name;
      }

      // search
      if (req.query.name) {
        query.name = { $regex: new RegExp(req.query.name, "i") };
      }

      const totalItems = await CourseModel.countDocuments(query);
      const totalPages = Math.ceil(totalItems / pageSize);

      const data = await CourseModel.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      res.json({
        data,
        page,
        totalPages,
        totalItems,
      });
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error"});
    }
  }
);

CourseController.post("/courses",authentication(["Admin", "Instructor"]),async(req, res) => {
    const {name,description,fees,duration} = req.body;
    if(!name || !description || !fees || !duration){
        return res.send({msg:'Please fill all the details'})
    }
    try {
        const course = await CourseModel.create({
            name:name,
            description:description,
            fees:fees,
            duration:duration,
        })
        res.send({msg:'Course created Successfully'})
        console.log(course)
    } catch (error) {
        console.log(error)
        res.send({msg:'Something went wrong'})
    }

  });

CourseController.patch("/courses/edit/:id", authentication(["Admin", "Instructor"]),async(req, res) => {
    const id = req.params.id
    try {
        const course = await CourseModel.findByIdAndUpdate({_id: id},{...req.body})
        if(course){
            res.send({ message:'course Updated Successfully', course});
            console.log(course)
        }
        else{
            res.send({ message:"course data not found"});
        }
    } catch (error) {
        console.log(error)
        res.send({msg:'Something went wrong!'})
    }

  });

CourseController.delete("/courses/delete/:id",authentication(["Admin", "Instructor"]),async(req, res) => {
    const id = req.params.id
    const createrId = req.userId
    try {
        const course = await CourseModel.findByIdAndDelete({_id: id, createrId })
        if(course){
            res.send({ message:'lecture delted Successfully',course})
            console.log(course)
        }
        else{
            res.send({ message:"lecture not found"});
        }
    } catch (error) {
        console.log(error)
        res.send({msg:'Something went wrong!!'})
    }
  }
);

module.exports = CourseController;
