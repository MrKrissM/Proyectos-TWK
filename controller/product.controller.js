const Product = require('../models/product.model');

const createProduct = (req, res) => {
    const rawData = req.body;
    const products = Array.isArray(rawData) ? rawData.map(data => new Product(data)) : [new Product(rawData)];
    Promise.all(products.map(product => product.save()))
        .then(savedProducts => {
            res.json({
                ok: true,
                products: savedProducts
            });
        })
        .catch(error => {
            console.error('Error al crear el producto:', error);
            res.status(500).json({
                ok: false,
                msg: 'Create product failed'
            });
        });
};

const getProducts = (_req, res) => {
    Product.find({}, 'name picture price make category description')
        .then((products) => {
            res.json({
                ok: true,
                products
            });
        })
        .catch(() => {
            res.json({
                ok: false,
                msg: 'Get product failed'
            });
        });
};

const getProductById = (req, res) => {
    const productId = req.params.id;
    Product.findById(productId, 'name picture price make category description')
        .then(product => {
            if (product) {
                res.json({
                    status: true,
                    product
                });
            } else {
                res.status(404).json({
                    ok: false,
                    msg: 'Product not found'
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                ok: false,
                msg: 'Get product failed'
            });
        });
};

const getProductByName = (req, res) => {
    const name = req.params.name;
    const regex = new RegExp(name, 'i'); 
    Product.find({ name: regex }, 'name picture price make category description')
        .then(products => {  
            if (products.length > 0) {
                res.json({
                    status: true,
                    products
                });
            } else {
                res.status(404).json({
                    ok: false,
                    msg: 'Product not found'
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                ok: false,
                msg: 'Get product failed'
            });
        });
};

const getProductByCategory = (req, res) => {
    const category = req.params.category;
    const regex = new RegExp(category, 'i'); 
    Product.find({ category: regex }, 'name picture price make category description')
        .then(products => {
            if (products.length > 0) {
                res.json({
                    status: true,
                    products
                });
            } else {
                res.status(404).json({
                    ok: false,
                    msg: 'No products found for the given category'
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                ok: false,
                msg: 'Get products by category failed'
            });
        });
};

const getProductByMake = (req, res) => {
    console.log('Entré a getProductByMake'); // Agrega esto

    const make = req.params.make;
    const regex = new RegExp(make, 'i'); 
    Product.find({ make: regex }, 'name picture price make category description')
        .then(products => {
            if (products.length > 0) {
                res.json({
                    status: true,
                    products
                });
            } else {
                res.status(404).json({
                    ok: false,
                    msg: 'No products found for the given make'
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                ok: false,
                msg: 'Get products by make failed'
            });
        });
};

const updateProduct = (req, res) => {
    const productId = req.body;
    const productData = req.body;
    Product.findByIdAndUpdate(productId, productData, { new: true })
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    status: false,
                    msg: 'Product not found'
                });
            }
            res.json({
                status: true,
                product
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: false,
                msg: 'Error product update'
            });
        });
};

const deleteProduct = (req, res) => {
    const productId = req.body;
    Product.deleteOne({ _id: productId })
        .then((product) => {
            if (product.deletedCount === 0) {
                return res.status(404).json({
                    status: false,
                    msg: 'Product not found'
                });
            }
            res.json({
                status: true,
                msg: 'Product delete success'
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: false,
                msg: 'Error delete product'
            });
        });
};

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductByName,
    getProductByCategory,
    getProductByMake
};
