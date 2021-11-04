module.exports = app => {
  const timeFrame = require('../controllers').TimeFrame;

  var router = require('express').Router();

  // Create a new TimeFrame
  router.post('/', timeFrame.createTimeFrames);

  // Retrieve all TimeFrame
  router.get('/', timeFrame.findAll);

  // Retrieve a single TimeFrame with id
  router.get('/:idTimeFrame', timeFrame.findOne);

  // Update a TimeFrame with id
  router.patch('/:idTimeFrame', timeFrame.update);

  // Delete a TimeFrame with id
  router.delete('/:idTimeFrame', timeFrame.remove);

  app.use('/api/timeFrames', router);
};
