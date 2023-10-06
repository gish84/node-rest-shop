const ProductAbl = require("../abl/product-abl");
const Constants = require("../helpers/constants");
const Tools = require("../helpers/tools");

class ProductController {
  async getAll(req, res, next) {
    let result;
    try {
      result = await ProductAbl.getAll();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({
        error: Tools.processError(err), // error objekt nejde vrátit (vrací se prázdný objekt) ---> proto ho skládám pomocí této pomocné fce
      });
    }
  }

  async getById(req, res, next) {
    // create dtoIn
    const dtoIn = { id: req.params.productId };

    // call to ABL
    let result;
    try {
      result = await ProductAbl.getById(dtoIn);
      return res.status(200).json(result);
    } catch (err) {
      // if product with given id doesn't exist
      if (
        err.code === Constants.ERROR_CODE_MAP.productGetByIdProductDoesNotExist
      ) {
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
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path,
    };

    // call to ABL
    let result;
    try {
      result = await ProductAbl.create(dtoIn);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({
        error: Tools.processError(err),
      });
    }
  }

  async update(req, res, next) {
    // create dtoIn (some keys can be "undefined" - they're filtered out in ABL)
    const dtoIn = {
      id: req.params.productId,
      name: req.body.name,
      price: req.body.price,
      productImage: req?.file?.path,
    };

    // call to ABL
    let result;
    try {
      result = await ProductAbl.update(dtoIn);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({
        error: Tools.processError(err),
      });
    }
  }

  async delete(req, res, next) {
    // create dtoIn
    const dtoIn = { id: req.params.productId };

    // call to ABL
    let result;
    try {
      result = await ProductAbl.delete(dtoIn);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({
        error: Tools.processError(err),
      });
    }
  }
}

module.exports = new ProductController();
