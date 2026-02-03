const { ApolloServer, AuthenticationError } = require("apollo-server");
const typeDefs = require("./schema/schema");


const livrosResolvers = require("./resolvers/livrosResolvers");
const authResolvers = require("./resolvers/authResolvers");

const { verificarToken } = require("./auth/auth");

const server = new ApolloServer({
  typeDefs,
  resolvers: [livrosResolvers, authResolvers],
  context: ({ req }) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");
    const user = verificarToken(token);
    return { user };
  },

  formatError: (err) => {
    return {
      message: err.message,
      code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
    };
  },
});


server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🔐 API Meu Pequeno Grimório segura em ${url}`);
});
