const fs = require("fs");
const _ = require("lodash");
const axios = require("axios");
const dotenv = require("dotenv");

const isPrime = require("../../utils/checkNumber");
const nextFibonacci = require("../../utils/nextFibonacci");
const generateFibonacci = require("../../utils/generateFibonacci");

require("dotenv").config();

const PokemonJSON = `${__dirname}/../../asset/pokemon.json`;

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

const getCatchedPokemon = async () => {
  try {
    const data = fs.readFileSync(PokemonJSON);

    return JSON.parse(data);
  } catch (err) {
    return err.message;
  }
};

const postCatchPokemon = async (objectData) => {
  const { pokemonName } = objectData;

  const gacha = Math.floor(Math.random() * (1 - 0 + 1)) + 0;

  try {
    if (gacha) {
      const response = await axios.get(`${PokeAPI_URL}/pokemon/${pokemonName}`);

      const catchedPokemon = await getCatchedPokemon();

      let nickname = "";
      let lastFibonacci;

      const groupedPokemonByName = catchedPokemon.filter(
        (data) => data.name.toLowerCase() === pokemonName.toLowerCase()
      );

      if (groupedPokemonByName.length === 0) {
        nickname = `${response.data.name}`;
      } else if (groupedPokemonByName.length === 1) {
        nickname = `${response.data.name}-0`;
      } else if (
        groupedPokemonByName.length == 2 ||
        groupedPokemonByName.length === 3
      ) {
        nickname = `${response.data.name}-1`;
      } else if (groupedPokemonByName.length > 2) {
        lastFibonacci =
          groupedPokemonByName[groupedPokemonByName.length - 1].nickname.split(
            "-"
          )[1];

        nickname = `${response.data.name}-${nextFibonacci(lastFibonacci)}`;
      }

      const formattedReponse = {
        id: response.data.id,
        insertedId: catchedPokemon.length + 1,
        name: response.data.name,
        url: response.config.url,
        nickname,
      };

      let newData;
      if (catchedPokemon.length === 0) {
        newData = [formattedReponse];
      }
      newData = [...catchedPokemon, formattedReponse];

      fs.writeFileSync(PokemonJSON, JSON.stringify(newData));

      return formattedReponse;
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};

const deleteReleaseCatchedPokemon = async (id) => {
  try {
    const gacha = Math.floor(Math.random(0, 100) * 100);

    const isPrimeNumber = isPrime(gacha); // 50%
    console.log(isPrimeNumber, "<<< isPrimeNumber");

    if (isPrimeNumber) {
      const catchedPokemon = await getCatchedPokemon();

      const selectedCatchedPokemon = catchedPokemon.find(
        (data) => String(data.insertedId) === id
      );

      const notDeletedPokemon = catchedPokemon.filter(
        (data) => String(data.insertedId) !== id
      );

      fs.writeFileSync(PokemonJSON, JSON.stringify(notDeletedPokemon));

      return selectedCatchedPokemon;
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
};

const patchRenameCatchedPokemon = async (id, nickname) => {
  try {
    const pokemonData = JSON.parse(fs.readFileSync(PokemonJSON));

    const getPokemonDataByNickname = pokemonData.filter((data) => {
      return data.nickname.toLowerCase().split("-")[0] === nickname;
    });

    let fibSequence = generateFibonacci(getPokemonDataByNickname.length);
    let pokemonByNicknameFib = [];
    getPokemonDataByNickname.map((data) => {
      if (data.nickname.split("-")[1] !== undefined) {
        pokemonByNicknameFib.push(Number(data.nickname.split("-")[1]));
      }
    });

    const sortedPokemonByNicknameFib = _.sortBy(pokemonByNicknameFib);
    const missingFib = () => {
      for (let i = 0; i < sortedPokemonByNicknameFib.length + 1; i++) {
        if (sortedPokemonByNicknameFib[i] !== fibSequence[i]) {
          return fibSequence[i];
        }
      }
    };

    if (missingFib()) {
      nickname = `${nickname}-${missingFib()}`;
    } else {
      if (getPokemonDataByNickname.length === 0) {
        nickname = `${nickname}`;
      } else if (getPokemonDataByNickname.length === 1) {
        nickname = `${nickname}-0`;
      } else if (
        getPokemonDataByNickname.length === 2 ||
        getPokemonDataByNickname.length === 3
      ) {
        nickname = `${nickname}-1`;
      } else {
        let currFib = 0;
        for (i in getPokemonDataByNickname) {
          if (getPokemonDataByNickname[i].nickname.split("-")[1] > currFib) {
            currFib = getPokemonDataByNickname[i].nickname.split("-")[1];
          }
        }
        nickname = `${nickname}-${nextFibonacci(currFib)}`;
      }
    }

    let changedData;
    const changedNicknamePokemonData = pokemonData.map((data) => {
      if (String(data.insertedId) === id) {
        changedData = {
          ...data,
          nickname,
        };
        return changedData;
      }
      return data;
    });

    fs.writeFileSync(PokemonJSON, JSON.stringify(changedNicknamePokemonData));

    return changedData;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getPokemonList,
  getPokemonDetail,
  getCatchedPokemon,
  postCatchPokemon,
  patchRenameCatchedPokemon,
  deleteReleaseCatchedPokemon,
};
