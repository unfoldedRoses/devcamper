const express=require('express')
const router=express.Router()
const {
  
    getcourses,getcoursesById
}=require('../controllers/courses')

// router.get('/', getbootcamps)
router.route('/').get(getcourses)
router.route('/:id').get(getcoursesById)

module.exports=router
