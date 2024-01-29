const Router = require("express").Router();

const PokemonHelper = require("../helpers/pokemonHelper");

const pokemonList = async (req, res) => {
  try {
    const response = await PokemonHelper.getPokemonList();

    return res
      .status(200)
      .send({ message: "Successfully Get All Pokemon", data: response });
  } catch (err) {
    console.log(err.message, "<<< getPokemonList Error");
    res.status(500).send({ message: err.message });
  }
};

Router.get("/", pokemonList);

module.exports = Router;
