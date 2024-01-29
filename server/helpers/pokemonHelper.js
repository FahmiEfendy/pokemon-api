const axios = require("axios");
const dotenv = require("dotenv");

require("dotenv").config();

const PokeAPI_URL = process.env.POKEAPI_URL || "https://pokeapi.co/api/v2";

const getPokemonList = async () => {
  try {
    const response = await axios.get(`${PokeAPI_URL}/pokemon`);

    return response.data;
  } catch (err) {
    return err.message;
  }
};

const getPokemonDetail = async (id) => {
  try {
    const response = await axios.get(`${PokeAPI_URL}/pokemon/${id}`);

    return response.data;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getPokemonList,
  getPokemonDetail,
};
