const Router = require('express')
const router = new Router

const controller = require('../controllers/productController')
const seedController = require('../controllers/seedController')

router.post('/create', controller.createProduct)
router.post('/set-quantity', controller.setQuantity)
router.get('/increment', controller.incrementQuantity) 
router.get('/decrement', controller.decrementQuantity)
router.get('/get-product-quantity', controller.getProductQuantity)

router.get('/seed', seedController.allSeed)
// router.get('/get-product', controller.getProduct)

module.exports = router 