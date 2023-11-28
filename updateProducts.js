// updateProducts.js

const mongoose = require('mongoose');
const Product = require('./models/product.model');

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/cursoDB');

// Crear una instancia de conexión
const db = mongoose.connection;

// Manejar eventos de conexión
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
    console.log('Conexión exitosa a la base de datos');

    // Actualizar todos los productos existentes para agregar la nueva categoría
    Product.updateMany({}, { $set: { make: 'Unknown' } })
        .then(result => {
            console.log('Productos actualizados exitosamente:', result);
        })
        .catch(err => {
            console.error('Error al actualizar productos:', err);
        })
        .finally(() => {
            // Cerrar la conexión de Mongoose después de completar la actualización
            mongoose.connection.close();
        });
});

