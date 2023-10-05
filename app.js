const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");

// ---------- DATABASE CONNECTION ----------
mongoose.connect(
  `mongodb+srv://buri84:${process.env.MONGO_ATLAS_PW}@buri-cluster.z3nk4gy.mongodb.net/?retryWrites=true&w=majority`
);

// ---------- MIDDLEWARE CHAIN ----------
// řetězec middlewarů, kterými request postupně projde (v pořadí, v jakém jsou zde uvedeny)

// middleware pro logování requestu (morgan)
app.use(morgan("dev"));

// veřejné zpřístupnění složky "uploads"
app.use("/uploads", express.static("uploads"));

// middleware pro parsování těla requestu (body-parser)
// parsování url
app.use(bodyParser.urlencoded({ extended: false }));
// parsování json
app.use(bodyParser.json({}));

// middleware pro přidání headers (kvůli CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// router pro přesměrování requestů
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);

// router pro odchycení "špatných" requestů (error handling)
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error); // vytváříme error, který posouváme do dalšího middleware
});

// middleware pro odchytávání chyb
// netýká se pouze předchozího middleware, který vytváří a posílá chybu při nesprávné routě
// do tohoto middleware spadnou všechny chyby, které se vyhodí v aplikací (např. chyba při dtb operaci apod.)
// jedná se tedy o univerzální middleware pro zpracování vzniklých chyb
app.use((error, req, res, next) => {
  // nstavení statusu (kódu chyby)
  res.status(error.status || 500);

  // definování výstupu (dtoOut) při chybě
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
