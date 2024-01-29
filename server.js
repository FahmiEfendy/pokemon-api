const dotenv = require("dotenv");
const express = require("express");

const pokemonRoutes = require("./server/api/pokemon");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/pokemon", pokemonRoutes);

app.listen(port, () => {
  console.log(`Successfully connected to port ${port}!`);
});
