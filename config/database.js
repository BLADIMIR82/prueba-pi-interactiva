//Mongoose es una librería para Node.js que nos  escribir consultas para una base de datos de MongooDB
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, { //motores o parametros de configuracion.
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
  })

  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));
