const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,
  {
    host: dbConfig.development.host,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
      },
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Bill = require('./bill.js')(sequelize, Sequelize);
db.BillInfo = require('./billInfo.js')(sequelize, Sequelize);
db.Course = require('./course.js')(sequelize, Sequelize);
db.TypeOfCourse = require('./typeOfCourse.js')(sequelize, Sequelize);
db.Class = require('./class.js')(sequelize, Sequelize);
db.ClassTime = require('./classTime.js')(sequelize, Sequelize);
db.TimeFrame = require('./timeFrame.js')(sequelize, Sequelize);

module.exports = db;
