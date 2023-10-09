const OrderAbl = require("../abl/order-abl");
const Constants = require("../helpers/constants");
const Tools = require("../helpers/tools");

class OrderController {
  async getAll(req, res, next) {
    let result;
    try {
      result = await OrderAbl.getAll();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({
        error: Tools.processError(err),
      });
    }
  }

  async getById(req, res, next) {
    // create dtoIn
    const dtoIn = { id: req.params.orderId };

    // call to ABL
    let result;
    try {
      result = await OrderAbl.getById(dtoIn);
      return res.status(200).json(result);
    } catch (err) {
      // if order with given id doesn't exist
      if (err.code === Constants.ERROR_CODE_MAP.orderGetByIdOrderDoesNotExist) {
        return res.status(404).json({
          error: Tools.processError(err),
        });
        // if call to database failed
      } else {
        return res.status(500).json({
          error: Tools.processError(err),
        });
      }
    }
  }

  async create(req, res, next) {
    // create dtoIn
    const dtoIn = {
      productId: req.body.productId,
      quantity: req.body.quantity,
    };

    // call to ABL
    let result;
    try {
      result = await OrderAbl.create(dtoIn);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({
        error: Tools.processError(err),
      });
    }
  }

  async delete(req, res, next) {
    // create dtoIn
    const dtoIn = { id: req.params.orderId };

    // call to ABL
    let result;
    try {
      result = await OrderAbl.delete(dtoIn);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({
        error: Tools.processError(err),
      });
    }
  }
}

module.exports = new OrderController();
