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

const catchedPokemon = async (req, res) => {
  try {
    const response = await PokemonHelper.getCatchedPokemon();

    return res.status(200).send({
      message: "Successfully Get All Catched Pokemon",
      data: response,
    });
  } catch (err) {
    console.log(err.message, "<<< getCatchedPokemon Error");
    res.status(500).send({ message: err.message });
  }
};

const catchPokemon = async (req, res) => {
  try {
    const response = await PokemonHelper.postCatchPokemon(req.body);

    if (response) {
      res
        .status(201)
        .send({ message: "Successfully Catch a Pokemon", data: response });
    } else {
      res.status(404).send({
        message: "Failed to Catch a Pokemon! Try Again!",
        data: [],
      });
    }
  } catch (err) {
    console.log(err.message, "<<< postCatchPokemon Error");
    res.status(500).send({ message: err.message });
  }
};

const releaseCatchedPokemon = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await PokemonHelper.deleteReleaseCatchedPokemon(id);

    if (response) {
      res
        .status(200)
        .send({ message: "Successfully Release a Pokemon", data: response });
    } else {
      res
        .status(202)
        .send({ message: "Failed to Release a Pokemon!", data: [] });
    }
  } catch (err) {
    console.log(err.message, "<<< releaseCatchedPokemon Error");
    res.status(500).send({ message: err.message });
  }
};

const renameCatchedPokemon = async (req, res) => {
  const { id } = req.params;
  const { nickname } = req.body;

  try {
    const response = await PokemonHelper.patchRenameCatchedPokemon(
      id,
      nickname
    );

    res.send({
      message: "Successfully Rename Catched Pokemon",
      data: response,
    });
  } catch (err) {
    console.log(err.message, "<<< renameCatchedPokemon Error");
    res.status(500).send({ message: err.message });
  }
};

Router.get("/catch", catchedPokemon);
Router.post("/catch", catchPokemon);
Router.delete("/catch/:id", releaseCatchedPokemon);
Router.patch("/catch/:id", renameCatchedPokemon);

Router.get("/", pokemonList);
Router.get("/:id", pokemonDetail);

module.exports = Router;
