"use strict";

const GetAll = {
  GetOrderListFailed: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "orderGetAllGetOrderListFailed";
      this.message = "Get order list failed.";
      this.cause = cause;
    }
  },
};

const GetById = {
  OrderGetFailed: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "orderGetByIdOrderGetFailed";
      this.message = "Get order failed.";
      this.cause = cause;
    }
  },

  OrderDoesNotExist: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "orderGetByIdOrderDoesNotExist";
      this.message = "Order with given id doesn't exist.";
      this.cause = cause;
    }
  },
};

const Create = {
  ProductDoesNotExist: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "orderCreateProductDoesNotExist";
      this.message = "Product does not exist.";
      this.cause = cause;
    }
  },

  OrderCreateFailed: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "orderCreateOrderCreateFailed";
      this.message = "Order create failed.";
      this.cause = cause;
    }
  },
};

const Delete = {
  OrderDeleteFailed: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "orderDeleteOrderDeleteFailed";
      this.message = "Order delete failed.";
      this.cause = cause;
    }
  },
};

module.exports = { GetAll, GetById, Create, Delete };
