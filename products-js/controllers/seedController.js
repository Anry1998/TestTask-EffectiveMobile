const ApiError = require('../error/ApiError')
const {Shop, Shelf} = require('../modelss/model')


class SeedController { 

    async allSeed(req, res, next) {
        const firstShop = "Пятерочка"
        const firstShelf = "Полка с товаром 1"

        const shops = [
            {name: firstShop},
            {name: "Магнит"},
        ] 
        const shelf = [
            {name: firstShelf, shopId: 1},
            {name: "Полка с товаром 1", shopId: 2},
        ]

        const checkFirstShop = await Shop.findOne({where: {name: firstShop}})
        const checkFirstShelf = await Shelf.findOne({where: {name: firstShelf}})

        console.log(checkFirstShop)
        console.log(checkFirstShelf)


        if (checkFirstShop && checkFirstShelf) {

            return res.json(`Данные в таблице уже заполнены `)
        } else if (!checkFirstShop && !checkFirstShelf) {
            for(let i=0; i<shops.length; i++) {
                await Shop.create({name: Object.values(shops[i])[0]})
                return res.json(`Данные в таблице магазинов успешно заполнены `)
            }
            for(let i=0; i< shelf.length; i++) {
                await Shelf.create({name: Object.values(shelf[i])[0], shopId: Object.values(shelf[i])[1]})
                return res.json(`Данные в таблице полок и магазинов успешно заполнены `)
            }
        } else if (checkFirstShop && !checkFirstShelf) {
            for(let i=0; i< shelf.length; i++) {
                await Shelf.create({name: Object.values(shelf[i])[0], shopId: Object.values(shelf[i])[1]})
                return res.json(`Данные в таблице полок успешно заполнены `)
            }
        } else if (!checkFirstShop && checkFirstShelf) {
            for(let i=0; i<shops.length; i++) {
                await Shop.create({name: Object.values(shops[i])[0]})
                return res.json(`Данные в таблице магазинов успешно заполнены `)
            }
        }
    } 

    async createShelf(req, res, next) {
        const firstShelf = "Полка с товаром 1"
        const shelf = [
            {name: firstShelf, shopId: 1},
            {name: "Полка с товаром 1", shopId: 2},
        ]
        const checkFirstShelf = await Shelf.findOne({where: {name: firstShelf}})
        if (checkFirstShelf) {
            return res.json(`Данные в таблице полок уже заполнены `)
        }
        for(let i=0; i< shelf.length; i++) {
            await Shelf.create({name: Object.values(shelf[i])[0], shopId: Object.values(shelf[i])[1]})
        }
        return res.json(`Данные по полкам были успешно сохранены`)
    }   
}

module.exports = new SeedController()