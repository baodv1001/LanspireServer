const { Account, Role } = require('../models');

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  Account.findByPk(req.idAccount).then(account => {
    Account.getRole().then(role => {
      if (role.name === 'admin') {
        next();
        return;
      }

      res.status(403).send({
        message: 'Require Admin Role!',
      });
      return;
    });
  });
};

isEmployee = (req, res, next) => {
  Account.findByPk(req.idAccount).then(account => {
    account.getRole().then(role => {
      if (role.name === 'employee') {
        next();
        return;
      }

      res.status(403).send({
        message: 'Require Employee Role!',
      });
    });
  });
};

isLecturer = (req, res, next) => {
  Account.findByPk(req.idAccount).then(account => {
    account.getRole().then(role => {
      if (role.name === 'lecturer') {
        next();
        return;
      }

      res.status(403).send({
        message: 'Require Lecturer Role!',
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isEmployee: isEmployee,
  isLecturer: isLecturer,
};
module.exports = authJwt;
