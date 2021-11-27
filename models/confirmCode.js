module.exports = (sequelize, Sequelize) => {
  const ConfirmCode = sequelize.define('ConfirmCode', {
    token: {
      type: Sequelize.STRING,
    },
    expiryDate: {
      type: Sequelize.DATE,
    },
  });

  ConfirmCode.createToken = async function (user) {
    let expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + 90);
    const _token = Math.floor(Math.random() * 900000 + 100000);
    let confirmCode = await ConfirmCode.create({
      token: _token,
      idUser: user.idUser,
      expiryDate: expiredAt.getTime(),
    });

    return confirmCode.token;
  };
  ConfirmCode.verifyExpiration = confirmCode => {
    return confirmCode.expiryDate.getTime() < new Date().getTime();
  };
  ConfirmCode.associate = models => {
    ConfirmCode.belongsTo(models.User, {
      foreignKey: 'idUser',
    });
  };

  return ConfirmCode;
};
