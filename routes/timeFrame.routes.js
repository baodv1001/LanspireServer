module.exports = app => {
  const timeFrame = require('../controllers').TimeFrame;

  var router = require('express').Router();

  // Create a new TimeFrame
  router.post('/', timeFrame.create);

  // Retrieve all TimeFrame
  router.get('/', timeFrame.findAll);

  // Retrieve a single TimeFrame with id
  router.get('/:idTimeFrame', timeFrame.findOne);

  // Update a TimeFrame with id
  router.put('/:idTimeFrame', timeFrame.update);

  // Delete a TimeFrame with id
  router.delete('/:idTimeFrame', timeFrame.remove);

  app.use('/api/timeFrames', router);
};
