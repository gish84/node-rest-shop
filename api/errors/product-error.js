"use strict";

const GetAll = {
  GetProductListFailed: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "productGetAllGetProductListFailed";
      this.message = "Get product list failed.";
      this.cause = cause;
    }
  },
};

const GetById = {
  ProductGetFailed: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "productGetByIdProductGetFailed";
      this.message = "Get product failed.";
      this.cause = cause;
    }
  },

  ProductDoesNotExist: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "productGetByIdProductDoesNotExist";
      this.message = "Product with given id doesn't exist.";
      this.cause = cause;
    }
  },
};

const Create = {
  ProductCreateFailed: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "productCreateProductCreateFailed";
      this.message = "Product create failed.";
      this.cause = cause;
    }
  },
};

const Update = {
  ProductUpdateFailed: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "productUpdateProductUpdateFailed";
      this.message = "Product update failed.";
      this.cause = cause;
    }
  },
};

const Delete = {
  ProductDeleteFailed: class extends Error {
    constructor(cause) {
      super(...arguments);
      this.code = "productDeleteProductDeleteFailed";
      this.message = "Product delete failed.";
      this.cause = cause;
    }
  },
};

module.exports = { GetAll, GetById, Create, Update, Delete };
