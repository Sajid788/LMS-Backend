const express = require('express')
const {connection, PORT} = require('./Config/db')
const {userController}= require('./Controller/userController');
 
const LectureController = require('./Controller/lectureController');
const CourseController = require('./Controller/courseController');
const DisscussionController = require('./Controller/disscussionController');
const AssignmentController = require('./Controller/assignmentController')

const app = express() 
app.use(express.json());

app.get('/', (req,res)=>{
    res.send({msg:"api is live"})
})

app.use('/user', userController);
app.use('/lecture', LectureController);
app.use('/course', CourseController)
app.use('/disscusion', DisscussionController);
app.use('/assignment', AssignmentController);


app.listen(PORT, async()=>{
    try {
        await connection
        console.log("connected deta base")
    } catch (error) {
        console.log(error)
    }
    console.log(`api is running ${PORT}`)
})