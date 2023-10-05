const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const ProductsController = require("../controllers/products");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/"); // prvním parametrem je Error - zatím tam žádný není a je tam pouze null
  },
  filename: function (req, file, callback) {
    const now = new Date().toISOString().replace(/:/g, "-"); // v ISO stringu je nutné nahradit ":", protože jde o nepovolený znak - s ním uložení padá
    const fileName = `${now}_${file.originalname}`;
    callback(null, fileName);
  },
});

const fileFilter = (req, file, callback) => {
  // reject  a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const Product = require("../models/product");

router.get("/", ProductsController.products_get_all);

// mezi první (path) a poslední (callback) parametr se dá vložit libovolné množství middleware fcí, které se postupně vykonají v uvedneém pořadí
// v tomto případě jako druhý parametr používáme vytvořený autentizační middleware "checkAuth"
// jako třetí parametr pak middleware z modulu multer pro zparsování multiform dat --- obsah se uloží do klíče req.file
router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  ProductsController.products_create_product
);

router.get("/:productId", ProductsController.products_get_product);

router.patch(
  "/:productId",
  checkAuth,
  ProductsController.products_update_product
);

router.delete(
  "/:productId",
  checkAuth,
  ProductsController.products_delete_product
);

module.exports = router;
