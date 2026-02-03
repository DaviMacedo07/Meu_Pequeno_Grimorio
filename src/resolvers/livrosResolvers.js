const livros = require("../data/livros");
const { AuthenticationError, ForbiddenError } = require("apollo-server");


const livrosResolvers = {
  Query: {
    livros: (_, __, context) => {
  if (!context.user) {
    throw new AuthenticationError("Usuário não autenticado");
  }

  if (context.user.role !== "ADMIN") {
    throw new ForbiddenError("Acesso negado");
  }

  return livros;
},


    livroPorId: (_, { id }, context) => {
      if (!context.user) {
        throw new Error("Não autorizado");
      }
      return livros.find((livro) => livro.id === id);
    },

    livrosPorCategoria: (_, { categoria }) => {z
      return livros.filter((livro) => livro.categoria === categoria);
    },
  },
};

module.exports = livrosResolvers;
