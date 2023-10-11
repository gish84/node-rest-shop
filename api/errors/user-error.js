"use strict";

const SignUp = {
  MailAlreadyExists: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "userSignUpMailAlreadyExists";
      this.message = "User with given email already exists.";
      this.cause = cause;
    }
  },

  UserCreateFailed: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "userSignUpUserCreateFailed";
      this.message = "User create failed.";
      this.cause = cause;
    }
  },
};

const Delete = {
  UserDeleteFailed: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "userDeleteUserDeleteFailed";
      this.message = "User delete failed.";
      this.cause = cause;
    }
  },
};

const Login = {
  UserDoesNotExist: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "userLoginUserDoesNotExist";
      this.message = "User with given email does not exist.";
      this.cause = cause;
    }
  },

  InvalidPassword: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "userLoginInvalidPassword";
      this.message = "Invalid password.";
      this.cause = cause;
    }
  },

  AuthorizationFailed: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "userLoginAuthorizationFailed";
      this.message = "Authorization failed.";
      this.cause = cause;
    }
  },
};

module.exports = { SignUp, Delete, Login };
