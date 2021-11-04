// const { User } = require('../controllers');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const { TokenExpiredError } = jwt;

catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: 'Unauthorized! Access Token was expired!' });
  }

  return res.sendStatus(401).send({ message: 'Unauthorized!1' });
};
verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.idUser = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.idUser).then(user => {
    user.getRole().then(role => {
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
  User.findByPk(req.idUser).then(user => {
    user.getRole().then(role => {
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
  User.findByPk(req.idUser).then(user => {
    user.getRole().then(role => {
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
