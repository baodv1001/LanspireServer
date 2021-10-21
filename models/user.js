module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      idUser: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'iduser',
      },
      displayName: {
        type: Sequelize.STRING,
        field: 'displayname',
      },
      gender: {
        type: Sequelize.INTEGER,
        field: 'gender',
      },
      phoneNumber: {
        type: Sequelize.STRING,
        field: 'phonenumber',
      },
      imageUrl: {
        type: Sequelize.STRING,
        field: 'imageurl',
      },
      address: {
        type: Sequelize.STRING,
        field: 'address',
      },
      dob: {
        type: Sequelize.DATE,
        field: 'dob',
      },
      isActivated: {
        type: Sequelize.BOOLEAN,
        field: 'isactivated',
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );
  User.associate = models => {};
  return User;
};
