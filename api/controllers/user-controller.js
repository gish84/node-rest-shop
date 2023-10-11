const UserAbl = require("../abl/user-abl");
const Constants = require("../helpers/constants");
const Tools = require("../helpers/tools");

class UserController {
  async signUp(req, res, next) {
    // create dtoIn
    const dtoIn = {
      email: req.body.email,
      password: req.body.password,
    };

    // call to ABL
    let result;
    try {
      result = await UserAbl.signUp(dtoIn);
      return res.status(200).json(result);
    } catch (err) {
      // if user with given email already exists
      if (err.code === Constants.ERROR_CODE_MAP.userSignUpMailAlreadyExists) {
        return res.status(409).json({
          error: Tools.processError(err),
        });
      } else {
        return res.status(500).json({
          error: Tools.processError(err),
        });
      }
    }
  }

  async delete(req, res, next) {
    // create dtoIn
    const dtoIn = { id: req.params.userId };

    // call to ABL
    let result;
    try {
      result = await UserAbl.delete(dtoIn);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({
        error: Tools.processError(err),
      });
    }
  }

  async login(req, res, next) {
    // create dtoIn
    const dtoIn = { email: req.body.email, password: req.body.password };

    // call to ABL
    let result;
    try {
      result = await UserAbl.login(dtoIn);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({
        error: Tools.processError(err),
      });
    }
  }
}

module.exports = new UserController();
