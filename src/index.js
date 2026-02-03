const { ApolloServer, gql } = require("apollo-server");

// Schema mínimo
const typeDefs = gql`
  type Query {
    status: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    status: () => "🟢 API Meu Pequeno Grimório está viva",
  },
};

// Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Servidor GraphQL rodando em ${url}`);
});
