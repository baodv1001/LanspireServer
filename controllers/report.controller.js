const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

const getByMonthYear = async (req, res) => {
  // Validate empty
  if (!req.body) {
    res.status(400).send({
      message: 'Body is empty!',
    });
    return;
  }

  const { year } = req.params;
  const sqlString = `select extract(month from createddate) as period,  sum(totalfee) from public."Bill" where  extract(year from createddate) = ${year} group by period order by period`;

  try {
    const revenue = await sequelize.query(sqlString, {
      type: QueryTypes.SELECT,
    });
    res.status(200).send(revenue);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getByQuarterYear = async (req, res) => {
  // Validate empty
  if (!req.body) {
    res.status(400).send({
      message: 'Body is empty!',
    });
    return;
  }

  const { year } = req.params;
  const sqlString = `select extract(quarter from createddate) as period,  sum(totalfee) from public."Bill" where  extract(year from createddate) = ${year} group by period order by period`;

  try {
    const revenue = await sequelize.query(sqlString, {
      type: QueryTypes.SELECT,
    });
    res.status(200).send(revenue);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getFromTo = async (req, res) => {
  // Validate empty
  if (!req.body) {
    res.status(400).send({
      message: 'Body is empty!',
    });
    return;
  }

  const { from, to } = req.body;
  const sqlString = `select createddate as date,  sum(totalfee) as total 
    from public."Bill" where createddate >= '${from}' and createddate <= '${to}'
    group by createddate order by createddate`;

  try {
    const revenue = await sequelize.query(sqlString, {
      type: QueryTypes.SELECT,
    });
    res.status(200).send(revenue);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getTopCourse = async (req, res) => {
  // Validate empty
  if (!req.body) {
    res.status(400).send({
      message: 'Body is empty!',
    });
    return;
  }

  const { month } = req.body;
  const sqlString = `SELECT "Class".idClass, className, sum("BillInfo".fee) as total
    FROM public."BillInfo" JOIN public."Bill"
    ON "Bill".idBill = "BillInfo".idBill
    JOIN public."Class"
    ON "BillInfo".idClass = "Class".idClass
    WHERE extract(month from createddate) = ${month}
    GROUP BY "Class".idClass
    ORDER BY total DESC`;

  try {
    const classes = await sequelize.query(sqlString, {
      type: QueryTypes.SELECT,
    });
    res.status(200).send(classes);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { getByMonthYear, getByQuarterYear, getFromTo, getTopCourse };
