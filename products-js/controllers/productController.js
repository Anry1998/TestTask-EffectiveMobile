const ApiError = require('../error/ApiError')
const {Production} = require('../modelss/model')
const sendMessageToKafka = require('./kafkaController') 

class ProductController  { 

    async createProduct(req, res, next) {
        const { plu, name } = req.body;
        await Production.create({plu, name}) 

        const topic = 'test-topic'  
        const data = {
            action: 'Создание товара',
            shop_id: 1,
            plu: plu,
            name:name 
        }
        sendMessageToKafka(topic, data)
        return res.json(`Товар ${name} был успешно создан`)
    } 

    async setQuantity(req, res, next) {
        const {id, quantity} = req.body
        const product = await Production.findOne({where: {id:id}})
        if (!product) { 
            return next(ApiError.badRequest(`Товар не найден`))
        }
        if (quantity < 0) { 
            return next(ApiError.badRequest(`Количество товара не может быть меньше 0`))
        }
        product.quantity = quantity
        await product.save()

        const topic = 'test-topic'  
        const data = {
            action: `Изменено количество товара, ${quantity}`,
            shop_id: 1,
            plu: product.plu,
            name:product.name
        }
        sendMessageToKafka(topic, data)

        return res.json(`Количество товара ${product.name} = ${quantity}`)
    }   

    async incrementQuantity(req, res, next) {
        const {id, increment} = req.query
        if (increment<=0) {
            return next(ApiError.badRequest(`Вводите только положительные числа`))
        } 
        const product = await Production.findOne({where: {id: id}})
        if (!product) { 
            return next(ApiError.badRequest(`Товар с plu: ${id} не найден`))
        }
        product.quantity = Number(product.quantity)  + Number(increment) 
        await product.save()

        const topic = 'test-topic' 
        const data = {
            action: `Количество товара увеличено на ${increment}`,
            shop_id: 1,
            plu: product.plu,
            name:product.name
        }
        sendMessageToKafka(topic, data)
        return res.json(`Количество товара с plu: ${id}, было увеличено на ${increment}`)
    }

    async decrementQuantity(req, res, next) {
        const {id, decrement} = req.query
        const product = await Production.findOne({where: {id: id}})
        if (!product) { 
            return next(ApiError.badRequest(`Товар с plu: ${id} не найден`))
        }
        if (product.quantity < decrement) {
            return next(ApiError.badRequest(`Недостаточно товара`))
        }
        product.quantity = Number(product.quantity) - Number(decrement) 
        await product.save()

        const topic = 'test-topic' 
        const data = {
            action: `Количество товара уменьшено на ${decrement}`,
            shop_id: 1,
            plu: product.plu,
            name:product.name
        }
        sendMessageToKafka(topic, data)
        return res.json(`Количество товара с plu: ${id}, было уменьшено на ${decrement}`)
    }

    async getProductQuantity(req, res, next) {
        const {plu} = req.query
        const product = await Production.findOne({where: {plu}})
        if (!product) { 
            return next(ApiError.badRequest(`Товар с plu: ${plu} не найден`))
        } 
        return res.json(`Количество товара с plu: ${plu} = ${product.quantity}`) 
    }

    async getProductByPlu(req, res, next) {
        const {plu} = req.query
        const product = await Production.findOne({where: {plu}})
        if (!product) { 
            return next(ApiError.badRequest(`Товар не найден`))
        } 
    }

    async getProductByName(req, res, next) {
        const { name} = req.query
         const products = await Production.findAll({where: {name}})
        if (!products) { 
            return next(ApiError.badRequest(`Товары не найден`))
        } 
        return res.json(products)
    }
}

module.exports = new ProductController()