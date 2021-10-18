module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define(
    'student',
    {
      idStudent: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idstudent',
      },
      idPersionalInfo: {
        type: Sequelize.INTEGER,
        field: 'idpersionalinfo',
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'isdeleted',
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return Student;
};
