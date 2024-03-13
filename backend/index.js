const express = require('express')
const {connection, PORT} = require('./Config/db')
const {userController}= require('./Controller/userController')

const app = express() 
app.use(express.json());

app.get('/', (req,res)=>{
    res.send({msg:"api is live"})
})

app.use('/user', userController);

app.listen(PORT, async()=>{
    try {
        await connection
        console.log("connected deta base")
    } catch (error) {
        console.log(error)
    }
    console.log(`api is running ${PORT}`)
})