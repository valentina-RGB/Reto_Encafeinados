const cors = require('cors');
const path = require("path");
const express = require('express');

const { connectToDatabase, sequelize } = require('./config/db');

const dotenv = require('dotenv');
dotenv.config();


class Server {

  constructor() {

    this.app = express();
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.PORT;

    //Middlewares
    this.middlewares();

    //Rutas
    this.routers();

    //Base de Datos
    this.syncDataBase();
  }

  middlewares() {
    //CORS
    this.app.use(cors({ origin: '*' }));

    //Parseo a json
    this.app.use(express.json());

  };

  syncDataBase = async () => {
    try {
      // Conectar a la base de datos
      await connectToDatabase();

      // Sincronizar la base de datos
      await sequelize.sync();

    } catch (error) {
      console.error("Error al sincronizar la base de datos:", error);
    }
  };

  routers() {
    this.app
    // Configura la carpeta pública para servir archivos estáticos
      // .use("/imagenes", express.static(path.join(__dirname, "../uploads")))

      // .use('/roles', require('./routers/roles.routes.js'))
      // .use('/usuarios', require('./routers/usuarios.routes.js'))

    this.app.get("/", (req, res) => {
      res.send("Welcome");
    });
  };

  listen() {
    this.app.listen(this.port, () => {
      console.log(`\nhttp://${this.host}:${this.port}`);
    });
  };
}

module.exports = Server;