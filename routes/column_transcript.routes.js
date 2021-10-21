module.exports = app => {
  const { Column_Transcript } = require('../controllers');

  var router = require('express').Router();

  // Create a new Bill
  router.post('/', Column_Transcript.create);

  // Retrieve all Bill
  router.get('/', Column_Transcript.findAll);

  // Retrieve a single Bill with id
  router.get('/:idColumn', Column_Transcript.findOne);

  // Update a Bill with id
  router.put('/:idColumn', Column_Transcript.update);

  // Delete a Bill with id
  router.delete('/:idColumn', Column_Transcript.remove);

  app.use('/api/column_transcripts', router);
};
