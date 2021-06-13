const {
  query
} = require('express');
const {
  findByIdAndUpdate,
  findById
} = require('../models/bootcamps')
const Bootcamp = require('../models/bootcamps')
const errorHandler = require('../utils/error');
const geocoder = require('../utils/geocoder');

exports.getbootcamps = async (req, res) => {
  const found = await Bootcamp.find()
  if (!found) {
      return new errorHandler(`Bootcamp not found with id of `, 404)

  }
  res.status(200).json({
      success: true,
      data: found.length,
      message: found
  })
}

exports.filtBootcamp = async (req, res) => {
  let query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

    // Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
      } else {
        query = query.sort('-createdAt');
      }
      let pagination={}
      const page=parseInt(req.query.page,10)||1;
      const limit=parseInt(req.query.limit,10)||100;
      const startIndex=(page-1)*limit
      const endIndex=page*limit
      const total = await Bootcamp.countDocuments(JSON.parse(queryStr));

      if(endIndex<total){
        pagination.next={
            page:page+1,
            limit
        }
      }
      if(startIndex>0){
        pagination.next={
            page:page-1,
            limit
        }
      }
      query=query.skip(startIndex).limit(limit)

  
  const bootcamps = await query
  if (!query) {
      return new errorHandler(`Bootcamp not found with id of `, 404)

  }
  res.status(200).json({
      success: true,
    
      data: bootcamps.length,pagination,
      message: bootcamps
  })
}

exports.getSinglebootcamps = async (req, res, next) => {

  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
      return next(
          new errorHandler(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
  }

  res.status(200).json({
      success: true,
      data: bootcamp
  });
}



// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
exports.getBootcampsInRadius = async (req, res, next) => {
  const {
      zipcode,
      distance
  } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
      location: {
          $geoWithin: {
              $centerSphere: [
                  [lng, lat], radius
              ]
          }
      }
  });

  res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps
  })
}




exports.createbootcamps = async (req, res) => {

  const added = await Bootcamp.create(req.body)
  if (!added) {
      res.status(401).send("cannot create!")
  }
  res.status(200).json({
      success: true,
      msg: "showing all bootcamps"
  })
}

exports.updatebootcamps = async (req, res) => {

  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
      res.stauts(401).send("not found!")
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
  });

  if (bootcamp) {
      res.status(200).send(bootcamp)
  }
  res.status(500).send("not found!")
}


exports.deletebootcamps = (req, res) => {
  res.status(200).json({
      success: true,
      msg: "showing all bootcamps"
  })
}