const ProductDao = require("../dao/product-dao");
const Errors = require("../errors/product-error");
const Tools = require("../helpers/tools");

class ProductAbl {
  /**
   * Returns all products
   * product object inlcudes chosen keys (name, price, id, productImage)
   * @returns {count: number, productList: Object[]}
   */
  async getAll() {
    // HDS 1 - get product list
    let productList;
    const projection = {
      id: "$_id",
      _id: 0,
      name: 1,
      price: 1,
      productImage: 1,
    };

    try {
      productList = await ProductDao.get({}, projection);
    } catch (err) {
      // A1 - getting product list failed
      throw new Errors.GetAll.GetProductListFailed({
        message: err.message,
        stack: err.stack,
      });
    }

    // HDS 2 - return dtoOut
    return { count: productList?.length, productList };
  }

  /**
   * Returns product by id
   * product object includes chosen keys (name, price, id, productImage)
   * @param {id: string} dtoIn
   * @returns {product: {_id: string, name: string, price: number}}
   */
  async getById(dtoIn) {
    // HDS 1 - extract values from dtoIn
    const { id } = dtoIn;

    // HDS 2 - get product
    let product;
    const projection = {
      id: "$_id",
      _id: 0,
      name: 1,
      price: 1,
      productImage: 1,
    };

    try {
      product = await ProductDao.getById(id, projection);
    } catch (err) {
      // A1 - getting product failed
      throw new Errors.GetById.ProductGetFailed({
        message: err.message,
        stack: err.stack,
      });
    }

    // A2 - product doesn't exist
    if (!product) {
      throw new Errors.GetById.ProductDoesNotExist();
    }

    // HDS 3 - return dtoOut
    return { product };
  }

  /**
   * Creates new product
   * @param {name: string, price: number, productImage: string} dtoIn
   * @returns {product: Object}
   */
  async create(dtoIn) {
    // HDS 1 - extract values from dtoIn
    const { name, price, productImage } = dtoIn;

    // HDS 2 - create product
    let product = {
      name,
      price,
      productImage,
    };

    try {
      product = await ProductDao.create(product);
    } catch (err) {
      // A1 - product create failed
      throw new Errors.Create.ProductCreateFailed({
        message: err.message,
        stack: err.stack,
      });
    }

    // HDS 3 - return dtoOut
    return { product };
  }

  async update(dtoIn) {
    // HDS 1 - remove undefined values from dtoIn
    Tools.removeUndefinedKeys(dtoIn);

    // HDS 2 - update product
    let product;
    try {
      product = await ProductDao.update(dtoIn);
    } catch (err) {
      // A1 - product update failed
      throw new Errors.Update.ProductUpdateFailed({
        message: err.message,
        stack: err.stack,
      });
    }

    // HDS 3 - return dtoOut
    return { product };
  }

  async delete(dtoIn) {
    // HDS 1 - extract values from dtoIn
    const { id } = dtoIn;

    // HDS 2 - delete product
    try {
      await ProductDao.delete(id);
    } catch (err) {
      // A1 - product update failed
      throw new Errors.Delete.ProductDeleteFailed({
        message: err.message,
        stack: err.stack,
      });
    }

    // HDS 3 - return dtoOut
    return {};
  }
}

module.exports = new ProductAbl();
