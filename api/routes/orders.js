const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const OrdersController = require("../controllers/order-controller");

router.get("/", checkAuth, OrdersController.getAll);

router.get("/:orderId", checkAuth, OrdersController.getById);

router.post("/", checkAuth, OrdersController.create);

router.delete("/:orderId", checkAuth, OrdersController.delete);

module.exports = router;
