const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const path = require("path");
const { initializeSequelize } = require('./Data/data');

const db = require('./models')
// const bodyParser = require('body-parser'); // Corregir nombre
// const Joi = require('joi');



class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    //this.app.use(body.urlencoded({ extended: false}));
    this.app.use(
      cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type,Authorization",
      })
    );
    this.Routers();

    this.syncDatabase();
  }

  syncDatabase = async () => {
    try {
    //   await db.sequelize.sync({ force: true });
    //   await db.sequelize.sync({ alter: true });

      
     await initializeSequelize();
        // Resto de la inicialización de tu aplicación
      
    
    } catch (error) {
      console.error("Error al sincronizar la base de datos:", error);
    }
  };

  Routers() {
    this.app
      // Configura la carpeta pública para servir archivos estáticos
    //   .use("/imagenes", express.static(path.join(__dirname, "../uploads")));

    this.app.get("/", (req, res) => {
      res.send("Welcome");
    });
  }

  Listen() {
    this.app.listen(this.port, () => {
      console.log(` http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;