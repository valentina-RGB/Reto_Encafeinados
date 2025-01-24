const userRepository = require('../repositories/users.repository');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const getAllUsers = async () => {
    try {
        return await userRepository.getAllUsers();
    } catch (error) {
        throw error;
    }
};

const getOneUser = async (id) => {
    try {
        return await userRepository.getOneUser(id);
    } catch (error) {
        throw error;
    }
};

const createUser = async (user) => {
    try {
        const hashedPassword = await bcrypt.hash(user.claveUsuario, SALT_ROUNDS);
        user.claveUsuario = hashedPassword;

        return await userRepository.createUser(user);
    } catch (error) {
        throw error;
    }
};

const updateUser = async (id, user) => {
    try {
        if (user.claveUsuario) {
            user.claveUsuario = await bcrypt.hash(user.claveUsuario, SALT_ROUNDS);
        }
        return await userRepository.updateUser(id, user);

    } catch (error) {
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        return await userRepository.deleteUser(id);
    } catch (error) {
        throw error;
    }
};

const nodemailer = require('nodemailer');

const createPassword = async (name) => {
    const cleanName = name.trim().replace(/\s+/g, '');
    const nrmd = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${cleanName}${nrmd}.`;
};

const sendEmail = async (email, password) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Contenido del correo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Credenciales de acceso a Encafeinados',
            text: `
            ¡Hola, CoffeLover!
        
            Nos complace tenerte dentro de la comunidad de Encafeinados. Tus credenciales de acceso son las siguientes:

            Usuario: ${email}
            Contraseña: ${password}

            Por favor, guarda esta información de manera segura.`
        };
        
        // Enviar correo
        await transporter.sendMail(mailOptions);

        console.log(`Correo enviado a ${email}`);
    } catch (error) {
        console.error('Error al enviar las credenciales:', error);
        throw error;
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    createPassword,
    sendEmail
};