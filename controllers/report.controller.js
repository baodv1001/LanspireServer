const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

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
    from public."Bill" where createddate >= '${from}' and createddate <= '${to}' and "Bill".isdeleted = false
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

const getTopClasses = async (req, res) => {
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
    WHERE extract(month from createddate) = ${month} AND "Bill".isdeleted = false
    GROUP BY "Class".idClass
    ORDER BY total DESC
    LIMIT 10`;

  try {
    const classes = await sequelize.query(sqlString, {
      type: QueryTypes.SELECT,
    });
    res.status(200).send(classes);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { getFromTo, getTopClasses };
