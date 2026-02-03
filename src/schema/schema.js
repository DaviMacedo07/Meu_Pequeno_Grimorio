const { gql } = require("apollo-server");

const typeDefs = gql`
  enum CategoriaLivro {
    FANTASIA
    DISTOPIA
    FICCAO
    TERROR
    TECNOLOGIA
  }

  type Livro {
    id: ID!
    titulo: String!
    autor: String!
    categoria: CategoriaLivro!
    descricao: String
    ano: Int!
  }

  type Query {
    livros: [Livro!]!
    livroPorId(id: ID!): Livro
    livrosPorCategoria(categoria: CategoriaLivro!): [Livro!]!
  }
    enum Role {
  ADMIN
  USER
}

type AuthPayload {
  token: String!
}

type Mutation {
  login(username: String!, password: String!): AuthPayload!
}

`;




module.exports = typeDefs;
