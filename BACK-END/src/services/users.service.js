const userRepository = require('../repositories/users.repository');

const nodemailer = require('nodemailer');
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

const createPassword = async (name) => {

    const cleanName = name
    .trim() // Elimina los espacios al inicio y al final
    .replace(/\s+/g, '') // Elimina los espacios intermedios
    .normalize('NFD') // Normaliza para separar caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Elimina las tildes
    .toLowerCase(); // Convierte todo a minúsculas

    // Capitaliza la primera letra y deja el resto en minúsculas
    const finalName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

    const nrmd = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${finalName}${nrmd}.`;
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