
const express = require('express')
const app = express()
const dotenv=require('dotenv')
const morgan=require('morgan')
const mongoose=require('mongoose')
dotenv.config({path:'./config/config.env'})
const errorHandler = require('./utils/error');
// const errorHandler = require('./utils/errResponse');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));


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


  //midllwares
  app.use(express.json())
  app.use(morgan('tiny'))


//routers
const bootcamps=require('./routes/bootcamps.js')
const courses=require('./routes/courses.js')



app.use('/api/bootcamps',bootcamps)
app.use('/api/course',courses)


app.use(errorHandler);

const port = 9090



app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})