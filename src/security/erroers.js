function sanitizeGraphQLError(formattedError, error) {
  // Mostre detalhes só em dev
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) return formattedError;

  // Em produção: limpe stacktrace, path, extensions suspeitas
  return {
    message: formattedError.message || "Erro interno.",
    code: formattedError.extensions?.code || "INTERNAL_SERVER_ERROR",
  };
}

module.exports = { sanitizeGraphQLError };
