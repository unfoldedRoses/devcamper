const express=require('express')

const {
    // getcourses
   addcourses, 
    getCoursesById,
    updatecourses
}=require('../controllers/courses')

const router = express.Router({ mergeParams: true });
//
router.put('/:id', updatecourses)

router.
route('/:bootcampId/courses')
  .get(getCoursesById)
  .post(addcourses)
module.exports=router
