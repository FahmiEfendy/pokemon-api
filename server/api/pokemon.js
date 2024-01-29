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

const pokemonDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await PokemonHelper.getPokemonDetail(id);

    return res
      .status(200)
      .send({ message: "Successfully Get Pokemon Detail", data: response });
  } catch (err) {
    console.log(err.message, "<<< getPokemonDetail Error");
    res.status(500).send({ message: err.message });
  }
};

Router.get("/", pokemonList);
Router.get("/:id", pokemonDetail);

module.exports = Router;
