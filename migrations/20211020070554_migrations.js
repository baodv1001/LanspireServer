const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Bill", deps: []
 * createTable() => "Class", deps: []
 * createTable() => "TimeFrame", deps: []
 * createTable() => "TypeOfCourse", deps: []
 * createTable() => "Course", deps: [TypeOfCourse]
 * createTable() => "ClassTime", deps: [Class, TimeFrame]
 * createTable() => "BillInfo", deps: [Bill, Course]
 *
 */

const info = {
  revision: 1,
  name: "migrations",
  created: "2021-10-20T07:05:54.300Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Bill",
      {
        idBill: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          field: "idbill",
          primaryKey: true,
        },
        idAccount: { type: Sequelize.INTEGER, field: "idaccount" },
        idStudent: { type: Sequelize.INTEGER, field: "idstudent" },
        createdDate: { type: Sequelize.DATE, field: "createddate" },
        totalFee: { type: Sequelize.BIGINT, field: "totalfee" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Class",
      {
        idClass: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          field: "idclass",
          primaryKey: true,
        },
        idCourse: { type: Sequelize.INTEGER, field: "idcourse" },
        room: { type: Sequelize.STRING, field: "room" },
        idCenter: { type: Sequelize.INTEGER, field: "idcenter" },
        isDeleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          field: "isdeleted",
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "TimeFrame",
      {
        idTimeFrame: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          field: "idtimeframe",
          primaryKey: true,
        },
        startingTime: { type: Sequelize.TIME, field: "startingtime" },
        endingTime: { type: Sequelize.TIME, field: "endingtime" },
        isDeleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          field: "isdeleted",
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "TypeOfCourse",
      {
        idTypeOfCourse: {
          type: Sequelize.INTEGER,
          field: "idtypeofcourse",
          autoIncrement: true,
          primaryKey: true,
        },
        nameOfType: { type: Sequelize.STRING, field: "nameoftype" },
        language: { type: Sequelize.STRING, field: "language" },
        tags: { type: Sequelize.ARRAY(Sequelize.TEXT), field: "tags" },
        isDeleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          field: "isdeleted",
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Course",
      {
        idCourse: {
          type: Sequelize.INTEGER,
          field: "idcourse",
          autoIncrement: true,
          primaryKey: true,
        },
        nameOfCourse: { type: Sequelize.STRING, field: "nameofcourse" },
        idLevel: { type: Sequelize.INTEGER, field: "idlevel" },
        idTypeOfCourse: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "TypeOfCourse", key: "idtypeofcourse" },
          allowNull: true,
          field: "idtypeofcourse",
        },
        startDate: { type: Sequelize.DATE, field: "startdate" },
        endDate: { type: Sequelize.DATE, field: "enddate" },
        fee: { type: Sequelize.BIGINT, field: "fee" },
        isDeleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          field: "isdeleted",
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "ClassTime",
      {
        idClassTime: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          field: "idclasstime",
          primaryKey: true,
        },
        idClass: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Class", key: "idclass" },
          unique: "ClassTime_idTimeFrame_idClass_unique",
          field: "idclass",
        },
        dayOfWeek: { type: Sequelize.INTEGER, field: "dayofweek" },
        idTimeFrame: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "TimeFrame", key: "idtimeframe" },
          unique: "ClassTime_idTimeFrame_idClass_unique",
          field: "idtimeframe",
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "BillInfo",
      {
        idBill: {
          type: Sequelize.INTEGER,
          unique: "BillInfo_idCourse_idBill_unique",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Bill", key: "idbill" },
          primaryKey: true,
          field: "idbill",
        },
        idCourse: {
          type: Sequelize.INTEGER,
          unique: "BillInfo_idCourse_idBill_unique",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Course", key: "idcourse" },
          primaryKey: true,
          field: "idcourse",
        },
        fee: { type: Sequelize.BIGINT, field: "fee" },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Bill", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["BillInfo", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Class", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["ClassTime", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Course", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["TimeFrame", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["TypeOfCourse", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
