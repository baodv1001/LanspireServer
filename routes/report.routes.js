module.exports = app => {
  const { Report } = require('../controllers');

  var router = require('express').Router();

  // get from to
  router.post('/revenue', Report.getFromTo);

  // get top class
  router.post('/class', Report.getTopCourse);

  // get by year (months)
  router.get('/year/:year/month', Report.getByMonthYear);

  // get by year (quarters)
  router.get('/year/:year/quarter', Report.getByQuarterYear);

  app.use('/api/report', router);
};
