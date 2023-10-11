const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserDao = require("../dao/user-dao");
const Errors = require("../errors/user-error");

class UserAbl {
  /**
   * Creates new user
   * @param {email: string, password: number} dtoIn
   * @returns {id: string, email: string} user object
   */
  async signUp(dtoIn) {
    // HDS 1 - extract values from dtoIn
    const { email, password } = dtoIn;

    // HDS 2 - validation if user with given email already exists (email should be unique)
    let user = (await UserDao.get({ email }))[0];
    if (user) {
      // A1 - user with given email already exists
      throw new Errors.SignUp.MailAlreadyExists();
    }

    // HDS 3 - hash password
    const hash = await bcrypt.hash(password, 10);

    // HDS 4 - create user
    const newUser = {
      email,
      password: hash,
    };

    try {
      user = await UserDao.create(newUser);
    } catch (err) {
      // A2 - user create failed
      throw new Errors.SignUp.UserCreateFailed({
        message: err.message,
        stack: err.stack,
      });
    }

    // HDS 4 - return dtoOut
    return {
      user: {
        id: user._id,
        email: user.email,
      },
    };
  }

  /**
   * Deletes user by id
   * @param {{id: string}} dtoIn
   * @returns {}
   */
  async delete(dtoIn) {
    // HDS 1 - extract values from dtoIn
    const { id } = dtoIn;

    // HDS 2 - delete user
    try {
      await UserDao.delete(id);
    } catch (err) {
      // A1 - user delete failed
      throw new Errors.Delete.UserDeleteFailed({
        message: err.message,
        stack: err.stack,
      });
    }

    // HDS 3 - return dtoOut
    return {};
  }

  /**
   * Logs in user
   * @param {email: string, password: string} dtoIn
   * @returns {token: string}
   */
  async login(dtoIn) {
    // HDS 1 - extract values from dtoIn
    const { email, password } = dtoIn;

    // HDS 2 - load user
    let user = (await UserDao.get({ email }))[0];
    if (!user) {
      // A1 - user with given email doesn't exist
      throw new Errors.Login.AuthorizationFailed();
    }

    // HDS 3 - compare password from dtoIn with password from user object
    const compareResult = await bcrypt.compare(password, user.password); // compare() returns boolean

    if (!compareResult) {
      // A2 - passwords doesn't match
      throw new Errors.Login.AuthorizationFailed();
    }

    // HDS 4 - generate JWT token
    const token = jwt.sign(
      {
        email: email,
        userId: user._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    // HDS 5 - return dtoOut
    return { token };
  }
}

module.exports = new UserAbl();
