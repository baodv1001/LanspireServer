module.exports = app => {
  const attendance = require('../controllers').Attendance;

  const router = require('express').Router();

  // Create a new attendance
  router.post('/', attendance.create);

  // Retrieve all attendance
  router.get('/', attendance.findAll);

  // // Retrieve a single attendance with id
  router.get('/:idAttendance', attendance.findOne);

  // // Update a attendance with id
  router.put('/:idAttendance', attendance.update);

  // // Delete a attendance with id
  router.delete('/:idAttendance', attendance.remove);

  app.use('/api/attendances', router);
};
