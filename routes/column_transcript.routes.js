module.exports = app => {
  const column_transcript = require('../controllers/column_transcript.controller.js');

  var router = require('express').Router();

  // Create a new Bill
  router.post('/', column_transcript.create);

  // Retrieve all Bill
  router.get('/', column_transcript.findAll);

  // Retrieve a single Bill with id
  router.get('/:idColumn', column_transcript.findOne);

  // Update a Bill with id
  router.put('/:idColumn', column_transcript.update);

  // Delete a Bill with id
  router.delete('/:idColumn', column_transcript.remove);

  app.use('/api/column_transcripts', router);
};
