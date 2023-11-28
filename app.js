
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { stringConnection } = require('./database/config');
const app = express();
app.use(cors());

// Lectura y parseo del body
app.use(express.json());
stringConnection();

// Rutas
app.use('/api/product', require('./routes/product.route'));
app.listen(process.env.PORT, () => {
    console.log('El servidor está corriendo en el puerto: ' + process.env.PORT);
});