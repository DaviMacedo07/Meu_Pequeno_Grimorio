const jwt = require("jsonwebtoken");

const SECRET_KEY = "grimorio_super_secreto"; // depois virará env

function gerarToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      role: usuario.role,
    },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
}

function verificarToken(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
}

module.exports = {
  gerarToken,
  verificarToken,
};
