const { Account, Role } = require('../models');

checkDuplicateUsername = (req, res, next) => {
  // Username
  Account.findOne({
    where: {
      username: req.body.username,
    },
  }).then(account => {
    if (account) {
      res.status(400).send({
        message: 'Failed! Username is already in use!',
      });
      return;
    }
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.role) {
    if (!Role.includes(req.body.role)) {
      res.status(400).send({
        message: 'Failed! Role does not exist = ' + req.body.role,
      });
      return;
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
