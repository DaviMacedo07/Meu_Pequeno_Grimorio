const usuarios = require("../data/usuarios");
const { gerarToken } = require("../auth/auth");

const authResolvers = {
  Mutation: {
    login: (_, { username, password }) => {
      const usuario = usuarios.find(
        (u) => u.username === username && u.password === password
      );

      if (!usuario) {
        throw new Error("Credenciais inválidas");
      }

      const token = gerarToken(usuario);

      return { token };
    },
  },
};

module.exports = authResolvers;
