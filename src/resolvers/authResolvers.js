const { AuthenticationError } = require("apollo-server");
const { gerarToken } = require("../auth/auth");

const authResolvers = {
  Mutation: {
    login: (_, { username, password }) => {

      // 🔒 Credenciais mockadas (MVP)
      if (username !== "admin" || password !== "123") {
        throw new AuthenticationError("Credenciais inválidas");
      }

      // 🔐 Token centralizado
      const token = gerarToken({ username });

      return { token };
    },
  },
};

module.exports = authResolvers;
