const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId, // klíč "product" bude typu mongo id
    ref: "Product", // klíč "ref" odkazuje ke schématu, k němuž se výše uvedené id vztahuje (tj. ke schématu/kolekci), v němž se nachází dokument s daným id (spárování)
    required: true,
  },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model("Order", orderSchema);
