const mongoose = require("mongoose");
const Product = require("../models/product");

class ProductDao {
  /**
   * Returns all products according to filter
   * @param {Object} filter
   * @param {Object} projection
   * @returns {Object[]} product list
   */
  async get(filter = {}, projection = {}) {
    return await Product.find(filter, projection);
  }

  /**
   * Returns product by id
   * @param {string} id
   * @param {Object} projection
   * @returns {Object} product
   */
  async getById(id, projection = {}) {
    return await Product.findOne({ _id: id }, projection);
  }

  /**
   * Creates new product
   * @param {name: string, price: number, productImage: string} productData
   * @returns {Object} created product
   */
  async create(productData) {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: productData.name,
      price: productData.price,
      productImage: productData.productImage,
    });

    return await product.save();
  }

  /**
   * Updates existing product
   * @param {Object} productData
   * @param {boolean} returnNew if new updated product should be return (in case of false - original object is returned)
   * @returns {Object} updated/original product
   */
  async update(productData, returnNew = true) {
    const product = {
      name: productData.name,
      price: productData.price,
      productImage: productData.productImage,
    };

    return await Product.findOneAndUpdate({ _id: productData.id }, product, {
      new: returnNew,
    });
  }

  /**
   * Deletes product with given id
   * @param {string} id
   * @returns {}
   */
  async delete(id) {
    return await Product.deleteOne({ _id: id });
  }
}

module.exports = new ProductDao();
