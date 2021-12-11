module.exports = (sequelize, Sequelize) => {
  const Attendance = sequelize.define(
    'Attendance',
    {
      idStudent: {
        type: Sequelize.UUID,
        field: 'idstudent',
      },
      idClassTime: {
        type: Sequelize.UUID,
        field: 'idclasstime',
      },
      checkedDate: {
        type: Sequelize.DATEONLY,
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
