// backend/routes/api/users.js
const express = require('express')
const router = express.Router();
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
      const { firstName, lastName, email, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);

      // Check if username or email already exists
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }]
        }
      });
      if (existingUser) {
        const err = new Error('User already exists');
        err.status = 500;
        err.errors = { username: 'User with that username already exists', email: 'User with that email already exists' };
        return next(err);
      }
      
      // if (firstName === "" || lastName === "" || email === "" || username === "" || password === "") {
      //   const err = new Error();
      //   err.message = 'Bad Request';
      //   err.status = 400;
      //   err.errors = { 
      //     email: "Invalid email",
      //     username: "Username is required", 
      //     firstName: "First Name is required",
      //     lastName: "Last Name is required",
      //     password: "Password is required"
      //   };
      //   return next(err);
      // }

      const user = await User.create({ firstName, lastName, email, username, hashedPassword });
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.status(201).json({
        user: safeUser
      });
    }
);

module.exports = router;