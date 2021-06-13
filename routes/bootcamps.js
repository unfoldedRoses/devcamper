const express=require('express')
const router=express.Router()
const {
     getbootcamps,
    getSinglebootcamps,
    createbootcamps,
    updatebootcamps,
    deletebootcamps,
    getBootcampsInRadius,
    filtBootcamp

}=require('../controllers/bootcamps')

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
// router.get('/', getbootcamps)
router.get('/', filtBootcamp)
router.get('/', getbootcamps)

router.get('/:id', getSinglebootcamps)
  router.post('/create',   createbootcamps)
  router.put('/update/:id', updatebootcamps)
  router.delete('/delete/:id', deletebootcamps)

module.exports=router
