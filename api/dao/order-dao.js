const mongoose = require("mongoose");
const Order = require("../models/order");

class OrderDao {
  /**
   * Returns all orders according to filter
   * @param {Object} filter
   * @param {Object} projection
   * @returns {Object[]} order list
   */
  async get(filter = {}, projection = {}) {
    return await Order.find(filter, projection).populate("product", "_id name"); // fce populate() nacte informace o produktu z kolekce "product"
  }

  /**
   * Returns order by id
   * @param {string} id
   * @param {Object} projection
   * @returns {Object} order
   */
  async getById(id, projection = {}) {
    return await Order.findOne({ _id: id }, projection).populate(
      "product",
      "_id name"
    );
  }

  /**
   * Creates new order
   * @param {productId: string, quantity: number} orderData
   * @returns {Object} created order
   */
  async create(orderData) {
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      product: orderData.productId,
      quantity: orderData.quantity,
    });

    return await order.save();
  }

  /**
   * Deletes order with given id
   * @param {string} id
   * @returns {}
   */
  async delete(id) {
    return await Order.deleteOne({ _id: id });
  }
}

module.exports = new OrderDao();
