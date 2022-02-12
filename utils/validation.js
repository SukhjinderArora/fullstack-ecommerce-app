const User = require('../models/user');

const registrationSchema = {
  firstName: {
    notEmpty: {
      errorMessage: 'First Name cannot be empty',
    },
    trim: true,
    isLength: {
      errorMessage:
        'First Name must be atleast 1 character and atmost 20 characters',
      options: {
        min: 1,
        max: 20,
      },
    },
    escape: true,
  },
  lastName: {
    notEmpty: {
      errorMessage: 'Last Name cannot be empty',
    },
    trim: true,
    isLength: {
      options: {
        min: 1,
        max: 20,
      },
      errorMessage:
        'Last Name must be atleast 1 character and atmost 20 characters',
    },
  },
  username: {
    notEmpty: {
      errorMessage: 'Username cannot be empty',
    },
    trim: true,
    isLength: {
      options: {
        min: 3,
        max: 10,
      },
      errorMessage:
        'Username must be at least 3 characters and at most 10 characters',
    },
    isNumeric: {
      negated: true,
      errorMessage: 'Username must be alphanumeric',
    },
    escape: true,
    custom: {
      options: async (value) => {
        const user = await User.findOne({
          where: {
            username: value,
          },
        });
        if (user) {
          return Promise.reject(new Error('Username already in use'));
        }
        return true;
      },
    },
  },
  email: {
    notEmpty: {
      errorMessage: 'Email cannot be empty',
    },
    isEmail: {
      errorMessage: 'Email is invalid',
    },
    normalizeEmail: true,
    custom: {
      options: async (value) => {
        const user = await User.findOne({
          where: {
            email: value,
          },
        });
        if (user) {
          return Promise.reject(new Error('E-mail already in use'));
        }
        return true;
      },
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'Password cannot be empty',
    },
    trim: true,
    isAlphanumeric: {
      errorMessage: 'Password should be alphanumeric',
    },
    isLength: {
      options: {
        min: 8,
        max: 16,
      },
      errorMessage:
        'Password must be at least 8 characters and at most 16 characters long',
    },
  },
  confirmPassword: {
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Confirm password does not match password');
        }
        return true;
      },
    },
  },
};

const loginSchema = {
  email: {
    notEmpty: {
      errorMessage: 'Email cannot be empty',
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'Password cannot be empty',
    },
  },
};

module.exports = {
  registrationSchema,
  loginSchema,
};
