const authService = require('../services/auth.service');

async function login(req, res) {
  try {
    const { correoUsuario, claveUsuario } = req.body;

    const result = await authService.login(correoUsuario, claveUsuario);
    return res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Usuario no encontrado' || error.message === 'Credenciales incorrectas') {
      // Error de autenticación
      return res.status(401).json({ error: 'Correo o contraseña inválida' });
    }
    // Error interno del servidor
    return res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
}

module.exports = {
  login
};
