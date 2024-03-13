const express = require("express");
const authentication = require("../Midleware/authentication");
const LectureModel = require("../Model/Lecture");
const LectureController = express.Router();

LectureController.get("/lectures", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;

    let query = {};

    // filter
   
    if(req.query.course){
        query.course = req.query.course;
    }

    // search
    if(req.query.name){
        query.name = { $regex: new RegExp(req.query.name, "i")};
    }
    
    const totalItems = await LectureModel.countDocuments(query);
    const totalPages = Math.ceil(totalItems / pageSize);

    const data = await LectureModel.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      data,
      page,
      totalPages,
      totalItems,
    });
    

  } catch (error) {
    console.log(error)
    res.send({ message: "Internal server error" });
  }
});


LectureController.post('/lectures', authentication(["Admin","Instructor"]), async (req,res)=>{
    const userName = req.userName
    const {name,course, url} = req.body;
    if(!name || !course || !url){
        return res.send({msg:'Please fill all the details'})
    }
    try {
        const lecture = await LectureModel.create({
            name:name,
            creator:userName,
            course:course,
            url:url,
        })
        res.send({msg:'Lecture created Successfully'})
        console.log(lecture)
    } catch (error) {
        console.log(error)
        res.send({msg:'Something went wrong'})
    }
});

LectureController.patch('/lectures/edit/:id', authentication(["Admin","Instructor"]), async (req,res)=>{
    const id = req.params.id
    const createrId = req.userId
    try {
        const user = await LectureModel.findByIdAndUpdate({_id: id, createrId },{...req.body})
        if(user){
            res.send({ message:'lecture Updated Successfully'})
            console.log(user)
        }
        else{
            res.send({ message:"lecture data not found"});
        }
    } catch (error) {
        console.log(error)
        res.send({msg:'Something went wrong!'})
    }
});

LectureController.delete('/lectures/delete/:id',authentication(["Admin","Instructor"]), async (req,res)=>{
    const id = req.params.id
    const createrId = req.userId
    try {
        const user = await LectureModel.findByIdAndDelete({_id: id, createrId })
        if(user){
            res.send({ message:'lecture delted Successfully'})
            console.log(user)
        }
        else{
            res.send({ message:"lecture not found"});
        }
    } catch (error) {
        console.log(error)
        res.send({msg:'Something went wrong!!'})
    }
});

module.exports = LectureController;