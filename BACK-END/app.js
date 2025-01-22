const Server = require("./src");

const startServer = async () => {
    try {
        // Crear e iniciar el servidor
        const server = new Server();
        server.listen();

    } catch (error) {
        console.error('No se pudo inicializar el servidor:', error);
        process.exit(1);
    }

};
module.exports = startServer();