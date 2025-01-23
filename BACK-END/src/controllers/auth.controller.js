const authService = require('../services/auth.service');

async function login(req, res) {
  try {
    const { correoUsuario, claveUsuario } = req.body;

    const result = await authService.loginUser(correoUsuario, claveUsuario);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: 'Correo o contraseña invalida' });
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
}

module.exports = {
  login
};
