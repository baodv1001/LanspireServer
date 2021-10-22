module.exports = app => {
  const notifications = require('../controllers').Notifications;

  var router = require('express').Router();

  // Create a new notifications
  router.post('/', notifications.create);

  // Retrieve all notifications
  router.get('/', notifications.findAll);

  // Retrieve a single notifications with id
  router.get('/:idNotification', notifications.findOne);

  // // Update a notifications with id
  router.put('/:idNotification', notifications.update);

  // // Delete a notifications with id
  router.delete('/:idNotification', notifications.remove);

  app.use('/api/notifications', router);
};
