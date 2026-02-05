const depthLimit = require("graphql-depth-limit");
const { createComplexityLimitRule } = require("graphql-validation-complexity");

function buildValidationRules() {
  // Ajuste conforme seu schema. MVP: 5~7 costuma ficar bom.
  const MAX_DEPTH = 7;

  // Complexidade: custo máximo por query.
  // MVP: comece com 1000 e ajuste conforme testes.
  const MAX_COMPLEXITY = 1000;

  return [
    depthLimit(MAX_DEPTH),
    createComplexityLimitRule(MAX_COMPLEXITY, {
      onCost: (cost) => {
        // útil pra debug (depois você pode remover ou logar com winston)
        console.log("GraphQL Query Cost:", cost);
      },
      formatErrorMessage: (cost) =>
        `Query muito complexa: custo ${cost} excede o limite ${MAX_COMPLEXITY}.`,
    }),
  ];
}

module.exports = { buildValidationRules };
