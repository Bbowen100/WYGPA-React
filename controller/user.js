const userModel = require('../models/user.js');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const env = require('../config/environment');

module.exports.create = function(req, res, next) {
  let { user, password } = req.body;
  userModel.findOne({ name: user }, (err0, result) => {
    if (err0 || result) {
      return res
        .status(200)
        .json({ bool: false, error: 'Username Already In Use' });
    }
    bcrypt.hash(password, null, null, function(err1, hash) {
      // Store hash in your password DB.
      if (err1) return res.status(500).json(err1);
      userModel.findOneAndUpdate(
        { name: user },
        { name: user, password: hash },
        { upsert: true },
        (err2, result) => {
          if (err2) return res.status(400).json(err2);
          return res.status(200).json({ bool: true, error: null });
          next();
        }
      );
    });
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
