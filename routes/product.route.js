
const { Router } = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct, getProductById, getProductByName, getProductByCategory, getProductByMake } = require('../controller/product.controller');

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.put('/', updateProduct);
router.delete('/', deleteProduct);
router.get('/:id', getProductById);
router.get('/name/:name', getProductByName);
router.get('/category/:category', getProductByCategory);
router.get('/make/:make', getProductByMake);

module.exports = router;