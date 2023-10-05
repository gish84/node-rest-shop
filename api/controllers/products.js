const mongoose = require("mongoose");
const Product = require("../models/product");

exports.products_get_all = (req, res, next) => {
  Product.find() // find() = metoda pro vylistování dokumentů v kolekci
    .select("name price _id productImage") // select() - metoda pro upřesnění klíčů, které se mají pro jednotlivé dokumenty vracet (v podstatě projekce)
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs,
      };
      return res.status(200).json(response);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

exports.products_create_product = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });

  product
    .save() //save() = metoda pro uložení objektu do databáze
    .then((result) => {
      return res.status(200).json({
        message: "Created product successfully",
        createdProduct: {
          _id: result._id,
          name: result.name,
          price: result.price,
          productImage: req.file.path,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

exports.products_get_product = (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .select("name price _id productImage")
    .then((result) => {
      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({ message: "No product for provided id" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

exports.products_update_product = (req, res, next) => {
  const id = req.params.productId;

  const update = {
    name: req.body.name,
    price: req.body.price,
  };

  Product.findOneAndUpdate({ _id: id }, update)
    .then((result) => {
      return res.status(200).json({ message: "Product updated" });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

exports.products_delete_product = (req, res, next) => {
  const id = req.params.productId;

  Product.deleteOne({ _id: id }) // remove() = metoda pro odstranění dokum
    .then((result) => {
      return res.status(200).json({ message: "Product deleted" });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};
