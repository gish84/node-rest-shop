const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select("_id product quantity")
    .populate("product", "_id name") // nacte informace o produktu z kolekce "product"
    .then((docs) => {
      return res.status(200).json({ count: docs.length, orders: docs });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

exports.orders_create_order = (req, res, next) => {
  // check if product with given id exists
  Product.findById(req.body.productId)
    .then((product) => {
      // if product doesnt exist, terminate with error
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // else if product exists - create order
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });

      return order.save();
    })
    .then((result) => {
      return res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

exports.orders_get_order = (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json({
        order,
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

exports.orders_delete_order = (req, res, next) => {
  const id = req.params.orderId;

  Order.deleteOne({ _id: id })
    .then((result) => {
      return res.status(200).json({ message: "Order deleted" });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};
