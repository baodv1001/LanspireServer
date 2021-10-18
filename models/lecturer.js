module.exports = (sequelize, Sequelize) => {
  const Lecturer = sequelize.define(
    'lecturer',
    {
      idLecturer: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idlecturer',
      },
      idPersionalInfo: {
        type: Sequelize.INTEGER,
        field: 'idpersionalinfo',
      },
      idAccount: {
        type: Sequelize.INTEGER,
        field: 'idaccount',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return Lecturer;
};
