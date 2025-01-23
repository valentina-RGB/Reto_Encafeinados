const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/users.repository');

const SECRET_KEY = process.env.SECRET_KEY;


const login = async (correoUsuario, claveUsuario) => {

    const user = await userRepository.findUserByEmail(correoUsuario);
   
    if (!user) throw new Error("Usuario no encontrado");

    // if(user && await bcrypt.compare(claveUsuario, user.claveUsuario))
    if (user && claveUsuario === user.claveUsuario) {
        const token = jwt.sign(
            { 
                id: user.idUsuario, 
                role: user.idRol,
                correo: user.correoUsuario,
            }, 
            SECRET_KEY, 
            { expiresIn: '10h' });

        return { success: true, message: "Inicio de sesión exitoso", token, user };
    }
    throw new Error('Credenciales incorrectas');
};

module.exports = {
    login
};
