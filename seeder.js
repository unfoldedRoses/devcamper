
const express = require('express')
const app = express()
const dotenv=require('dotenv')
const morgan=require('morgan')
const mongoose=require('mongoose')
const fs=require('fs')
const color=require('colors')

// const errorHandler = require('./utils/errResponse');

dotenv.config({path:'./config/config.env'})
const Bootcamp=require('./models/bootcamps')
const Course=require('./models/courses')


// db
mongoose
  .connect('mongodb://localhost:27017/devcamper', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('DB CONNECTION ERR', err))



const bootcamp=JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'))
const Coursee=JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`,'utf-8'))



const importData=async()=>{
    try {
        await Bootcamp.create(bootcamp)
       await Course.create(Coursee)
        console.log('data imported '.green.inverse)
    } catch (error) {
        console.log(error)
    }
}

const deleteData=async()=>{
    try {
        await Bootcamp.deleteData(bootcamp)
        console.log('data deleted '.red.inverse)
    } catch (error) {
        console.log(error)
    }
}

if(process.argv[2]==='-i'){
    importData()
}else if(process.argv[2]==='-d'){
        deleteData()
    
}





