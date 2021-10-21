module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define(
    'Student',
    {
      idStudent: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'idstudent',
      },
      idUser: {
        type: Sequelize.UUID,
        field: 'iduser',
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
  Student.associate = models => {
    Student.belongsTo(models.User, {
      foreignKey: 'idUser',
    });
    Student.hasMany(models.Bill, {
      foreignKey: 'idStudent',
    });
  };

  return Student;
};
