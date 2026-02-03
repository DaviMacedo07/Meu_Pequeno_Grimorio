const { ApolloServer } = require("apollo-server");

const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers/livrosResolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`📚 API Meu Pequeno Grimório rodando em ${url}`);
});
