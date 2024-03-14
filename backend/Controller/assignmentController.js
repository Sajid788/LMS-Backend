const express = require('express');
const authentication = require('../Midleware/authentication');
const AssignmentModel = require('../Model/Assignement');
const AssignmentController = express.Router();

AssignmentController.get('/assignments', async(req,res) =>{
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 8;
    
        let query = {};
    
        // filter
       
        if(req.query.category){
            query.course = req.query.category;
        }
    
        // search
        if(req.query.title){
            query.title = { $regex: new RegExp(req.query.title, "i")};
        }
        
        const totalItems = await AssignmentModel.countDocuments(query);
        const totalPages = Math.ceil(totalItems / pageSize);
    
        const data = await AssignmentModel.find(query)
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
    
    AssignmentController.post('/assignments', authentication(["Admin","Instructor"]), async (req,res)=>{
        const {title,category,creator,deadline} = req.body;
        if(!title || !category || !deadline, !creator){
            return res.send({msg:'Please fill all the details'})
        }
        try {
            const assignment = await AssignmentModel.create({
                title:title,
                category:category,
                creator:creator,
                deadline:deadline,
            })
            res.send({msg:'Assignment created Successfully'})
            console.log(assignment)
        } catch (error) {
            console.log(error)
            res.send({msg:'Something went wrong'})
        }
});

AssignmentController.patch('/assignments/edit/:id', authentication(['Admin',"Instructor"]), async(req,res) =>{
    const id = req.params.id
    const createrId = req.userId
    try {
        const assignment = await AssignmentModel.findByIdAndUpdate({_id: id, createrId },{...req.body})
        if(assignment){
            res.send({ message:'Assignment Updated Successfully'})
            console.log(assignment)
        }
        else{
            res.send({ message:"Assignment data not found"});
        }
    } catch (error) {
        console.log(error)
        res.send({msg:'Something went wrong!'})
    }
});

AssignmentController.delete('/assignments/delete/:id', authentication(['Admin',"Instructor"]), async(req,res) =>{
    const id = req.params.id
    const createrId = req.userId
    try {
        const assignment = await AssignmentModel.findByIdAndDelete({_id: id, createrId })
        if(assignment){
            res.send({ message:'Assignment deleted Successfully'})
            console.log(assignment)
        }
        else{
            res.send({ message:"lecture not found"});
        }
    } catch (error) {
        console.log(error)
        res.send({msg:'Something went wrong!!'})
    }
})


module.exports = AssignmentController;