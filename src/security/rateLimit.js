const rateLimit = require("express-rate-limit");

function buildRateLimiter() {
  return rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 60, // 60 req/min por IP (ajuste conforme necessidade)
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Muitas requisições. Tente novamente em instantes." },
  });
}

module.exports = { buildRateLimiter };
