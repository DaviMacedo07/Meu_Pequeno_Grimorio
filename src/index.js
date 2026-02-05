const { ApolloServer, AuthenticationError } = require("apollo-server");
const depthLimit = require("graphql-depth-limit");
const { createComplexityLimitRule } = require("graphql-validation-complexity");

const typeDefs = require("./schema/schema");

const livrosResolvers = require("./resolvers/livrosResolvers");
const authResolvers = require("./resolvers/authResolvers");

const { verificarToken } = require("./auth/auth");

const server = new ApolloServer({
  typeDefs,
  resolvers: [livrosResolvers, authResolvers],

  // 🔐 CONTEXTO DE AUTENTICAÇÃO
  context: ({ req }) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");

    const user = verificarToken(token); // pode retornar null
    return { user };
  },

  // 🛡️ VALIDAÇÕES DE SEGURANÇA (FASE 4)
  validationRules: [
    depthLimit(7), // Limite de profundidade (anti DoS lógico)

    createComplexityLimitRule(1000, {
      onCost: (cost) => {
        console.log("📊 Complexidade da Query:", cost);
      },
      formatErrorMessage: (cost) =>
        `Query muito complexa (custo: ${cost}).`,
    }),
  ],

  // 🚨 TRATAMENTO DE ERROS (ANTI VAZAMENTO)
  formatError: (err) => {
    const isProd = process.env.NODE_ENV === "production";

    if (!isProd) {
      return {
        message: err.message,
        code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
      };
    }

    // Em produção: erro genérico e seguro
    return {
      message: "Erro ao processar a requisição.",
      code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
    };
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🔐 API Meu Pequeno Grimório segura em ${url}`);
});
