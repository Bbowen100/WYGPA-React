const userModel = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../config/environment');

const SALTROUNDS = 10;

module.exports.create = function(req, res, next) {
  let { user, password } = req.body;
  userModel.find({ name: user }, (err0, results) => {
    if (!results.length) {
      bcrypt.hash(password, SALTROUNDS, function(err1, hash) {
        // Store hash in your password DB.
        userModel.findOneAndUpdate(
          { name: user },
          { name: user, password: hash },
          { upsert: true },
          (err2, result) => {
            return res.status(200).json({ bool: true, error: null });
            next();
          }
        );
      });
    } else {
      return res.status(200).json({ bool: null, error: 'Duplicate User Name' });
      next();
    }
  });
};

module.exports.receive = function(req, res, next) {
  let { user, password } = req.body;
  userModel.findOne({ name: user }, (err0, result) => {
    if (result) {
      bcrypt.compare(password, result.password, (err1, boolean) => {
        if (err1) {
          return res.status(401).json({ bool: null, error: err1 });
        } else {
          if (boolean) {
            const token = jwt.sign(
              {
                user: result.name,
                id: result._id
              },
              env.JWT_SECRET
            );
            return res.status(200).json({ bool: boolean, error: null, token });
          }
          return res
            .status(200)
            .json({ bool: boolean, error: null, token: null });
        }
        next();
      });
    } else {
      return res.status(401).json({ bool: null, error: 'No Such User' });
      next();
    }
  });
};
