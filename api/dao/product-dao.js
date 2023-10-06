const mongoose = require("mongoose");
const Product = require("../models/product");

class ProductDao {
  /**
   * Returns all products
   * @param {string} selectedFields parameters for select() function (which keys should be return for object)
   * @returns {Object[]} product list
   */
  async get(selectedFields = "") {
    return await Product.find().select(selectedFields); // select() - metoda pro upřesnění klíčů, které se mají pro jednotlivé dokumenty vracet (v podstatě projekce)
  }

  /**
   * Returns product by id
   * @param {string} id
   * @param {string} selectedFields parameters for select() function (which keys should be return for object)
   * @returns {Object} product
   */
  async getById(id, selectedFields = "") {
    return await Product.findById(id).select(selectedFields);
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
