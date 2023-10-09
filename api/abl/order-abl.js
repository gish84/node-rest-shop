const OrderDao = require("../dao/order-dao");
const ProductDao = require("../dao/product-dao");
const Errors = require("../errors/order-error");
const Tools = require("../helpers/tools");

class OrderAbl {
  /**
   * Returns all orders
   * order object inlcudes chosen keys (id, product, quantity)
   * @returns {count: number, orderListList: Object[]}
   */
  async getAll() {
    // HDS 1 - get order list
    let orderList;
    const projection = {
      id: "$_id",
      _id: 0,
      product: 1,
      quantity: 1,
    };

    try {
      orderList = await OrderDao.get({}, projection);
    } catch (err) {
      // A1 - getting order list failed
      throw new Errors.GetAll.GetOrderListFailed({
        message: err.message,
        stack: err.stack,
      });
    }

    // HDS 2 - return dtoOut
    return { count: orderList?.length, orderList };
  }

  /**
   * Returns order by id
   * order object inlcudes chosen keys (id, product, quantity)
   * @param {id: string} dtoIn
   * @returns {order: {_id: string, product: Object, quantity: number}}
   */
  async getById(dtoIn) {
    // HDS 1 - extract values from dtoIn
    const { id } = dtoIn;

    // HDS 2 - get order
    let order;
    const projection = {
      id: "$_id",
      _id: 0,
      product: 1,
      quantity: 1,
    };

    try {
      order = await OrderDao.getById(id, projection);
    } catch (err) {
      // A1 - getting order failed
      throw new Errors.GetById.OrderGetFailed({
        message: err.message,
        stack: err.stack,
      });
    }

    // A2 - order doesn't exist
    if (!order) {
      throw new Errors.GetById.OrderDoesNotExist();
    }

    // HDS 3 - return dtoOut
    return { order };
  }

  /**
   * Creates new order
   * @param {productId: string, quantity: number} dtoIn
   * @returns {order: Object}
   */
  async create(dtoIn) {
    // HDS 1 - extract values from dtoIn
    const { productId, quantity } = dtoIn;

    // HDS 2 - check if product with given id exists (if it doesn't, terminate with error)
    const product = await ProductDao.getById(productId);
    if (!product) {
      // A1 - product doesn't exist
      throw new Errors.Create.ProductDoesNotExist();
    }

    // HDS 3 - create order
    let order = {
      productId,
      quantity,
    };

    try {
      order = await OrderDao.create(order);
    } catch (err) {
      // A2 - order create failed
      throw new Errors.Create.OrderCreateFailed({
        message: err.message,
        stack: err.stack,
      });
    }

    // HDS 4 - return dtoOut
    return {
      order: {
        id: order._id,
        product: order.product,
        quantity: order.quantity,
      },
    };
  }

  /**
   * Deletes order by id
   * @param {{id: string}} dtoIn
   * @returns {}
   */
  async delete(dtoIn) {
    // HDS 1 - extract values from dtoIn
    const { id } = dtoIn;

    // HDS 2 - delete order
    try {
      await OrderDao.delete(id);
    } catch (err) {
      // A1 - order delete failed
      throw new Errors.Delete.OrderDeleteFailed({
        message: err.message,
        stack: err.stack,
      });
    }

    // HDS 3 - return dtoOut
    return {};
  }
}

module.exports = new OrderAbl();
