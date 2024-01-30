const Joi = require("joi");
const Boom = require("boom");

const renameCatchedPokemonValidation = (data) => {
  const schema = Joi.object({
    nickname: Joi.string().required().description("Pokemon nickname, i.e. Ash"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  renameCatchedPokemonValidation,
};
