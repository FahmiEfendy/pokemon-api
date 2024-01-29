const axios = require("axios");

const getPokemonList = async () => {
  console.log("aa");
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    return response.data;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getPokemonList,
};
