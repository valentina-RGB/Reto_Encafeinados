const cors = require('cors');
const path = require("path");
const { Sequelize } = require('sequelize');
// const Sequelize = require('sequelize');
const express = require('express');
const {db, sequelize} = require('./models')
const { connectToDatabase} = require('./config/db');

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

    //sincronizar base de datos
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
           
      // Sincronizar los modelos con la base de datos
      // await sequelize.sync({ alter: true });


      // Conectar a la base de datos
      await connectToDatabase();

      // Sincronizar la base de datos
      // await sequelize.sync();

    } catch (error) {
      console.error("Error al sincronizar la base de datos:", error);
    }
  };

  routers() {
    this.app
    this.app

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