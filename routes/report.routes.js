module.exports = app => {
  const { Report } = require('../controllers');

  var router = require('express').Router();

  // get from to
  router.post('/revenue', Report.getFromTo);

  // get top class
  router.post('/class', Report.getTopClasses);

  app.use('/api/report', router);
};
