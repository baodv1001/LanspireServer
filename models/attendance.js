module.exports = (sequelize, Sequelize) => {
  const Attendance = sequelize.define(
    'Attendance',
    {
      idStudent: {
        type: Sequelize.INTEGER,
        field: 'idstudent',
      },
      idClassTime: {
        type: Sequelize.INTEGER,
        field: 'idclasstime',
      },
      checkedDate: {
        type: Sequelize.DATE,
        field: 'checkeddate',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return Attendance;
};
