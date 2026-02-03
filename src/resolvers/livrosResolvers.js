const livros = require("../data/livros");

const livroResolvers = {
  Query: {
    livros: () => livros,

    livroPorId: (_, { id }) => {
      return livros.find((livro) => livro.id === id);
    },

    livrosPorCategoria: (_, { categoria }) => {
      return livros.filter((livro) => livro.categoria === categoria);
    },
  },
};

module.exports = livroResolvers;
