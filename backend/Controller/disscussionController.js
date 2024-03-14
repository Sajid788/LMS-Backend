const express = require('express');
const authentication = require('../Midleware/authentication');
const DisscussionModel = require('../Model/Disscussion');
const DisscussionController = express.Router();

DisscussionController.get('/disscussions', authentication(['Admin', 'Student',"Instructor"]), async(req,res) =>{
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 8;
    
        let query = {};
    
        // filter
       
        if(req.query.status){
            query.status = req.query.status;
        }
    
        // search
        if(req.query.title){
            query.title = { $regex: new RegExp(req.query.title, "i")};
        }
        
        const totalItems = await DisscussionModel.countDocuments(query);
        const totalPages = Math.ceil(totalItems / pageSize);
    
        const data = await DisscussionModel.find(query)
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

DisscussionController.post('/disscussions', authentication(['Admin','Student',"Instructor"]), async(req,res) =>{
    const createrId= req.userId;
    const {title,description} = req.body;
    if(!title || !description ){
        return res.send({msg:'Please fill all the details'})
    }
    try {
        const disscussion = await DisscussionModel.create({
            title:title,
            description:description,
            status:"Pending",
            createrId:createrId,
        })
        res.send({msg:'Disscussion created Successfully'})
        console.log(disscussion)
    } catch (error) {
        console.log(error)
        res.send({msg:'Something went wrong'})
    }
});

DisscussionController.patch('/disscussions/edit/:id', authentication(['Admin',"Instructor"]), async(req,res) =>{
    const id = req.params.id
    try {
        const disscussion = await DisscussionModel.findByIdAndUpdate(id, req.body)
        if(disscussion){
            res.send({ message:'Disscussion Updated Successfully'})
            console.log(disscussion)
        }
        else{
            res.send({ message:"Disscussion data not found"});
        }
    } catch (error) {
        console.log(error)
        res.send({msg:'Something went wrong!'})
    }
});

DisscussionController.delete('/disscussions/delete/:id', authentication(['Admin',"Instructor"]), async(req,res) =>{
    const id = req.params.id
    try {
        const disscussion = await DisscussionModel.findByIdAndDelete(id)
        if(disscussion){
            res.send({ message:'Disscussion delted Successfully'})
            console.log(disscussion)
        }
        else{
            res.send({ message:"Disscussion not found"});
        }
    } catch (error) {
        console.log(error)
        res.send({msg:'Something went wrong!'})
    }
})


module.exports = DisscussionController;