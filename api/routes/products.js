const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const ProductController = require("../controllers/product-controller");

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

router.get("/", ProductController.getAll);

router.get("/:productId", ProductController.getById);

// mezi první (path) a poslední (callback) parametr se dá vložit libovolné množství middleware fcí, které se postupně vykonají v uvedneém pořadí
// v tomto případě jako druhý parametr používáme vytvořený autentizační middleware "checkAuth"
// jako třetí parametr pak middleware z modulu multer pro zparsování multiform dat --- obsah se uloží do klíče req.file
router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  ProductController.create
);

router.patch(
  "/:productId",
  checkAuth,
  upload.single("productImage"),
  ProductController.update
);

router.delete("/:productId", checkAuth, ProductController.delete);

module.exports = router;
