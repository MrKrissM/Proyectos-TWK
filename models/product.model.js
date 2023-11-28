const { Schema, model } = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true,
    },
    price: {
        type: Number, default: 0,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }

});

module.exports = model('Product', productSchema);