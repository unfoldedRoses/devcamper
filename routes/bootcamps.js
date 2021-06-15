const express=require('express')

const {
     getbootcamps,
    getSinglebootcamps,
    createbootcamps,
    updatebootcamps,
   
    getBootcampsInRadius,
    filtBootcamp,
    deleteBootcamp

}=require('../controllers/bootcamps')


// Include other resource routers
const courseRouter = require('./courses');

const router=express.Router()

router.use('/:bootcampId/courses', courseRouter);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
// router.get('/', getbootcamps)

router.get('/', filtBootcamp)
router.get('/', getbootcamps)
router.get('/', getbootcamps)


router.get('/:id', getSinglebootcamps)

  router.post('/create',   createbootcamps)
  router.put('/update/:id', updatebootcamps)
  router.delete('/delete/:id', deleteBootcamp)

module.exports=router
