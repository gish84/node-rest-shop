const mongoose = require("mongoose");
const User = require("../models/user");

class UserDao {
  /**
   * Returns all users according to filter
   * @param {Object} filter
   * @param {Object} projection
   * @returns {Object[]} user list
   */
  async get(filter = {}, projection = {}) {
    return await User.find(filter, projection);
  }

  /**
   * Creates new user
   * @param {email: string, password: string} userData
   * @returns {Object} created user
   */
  async create(userData) {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: userData.email,
      password: userData.password,
    });

    return await user.save();
  }

  /**
   * Deletes user with given id
   * @param {string} id
   * @returns {}
   */
  async delete(id) {
    return await User.deleteOne({ _id: id });
  }
}

module.exports = new UserDao();
