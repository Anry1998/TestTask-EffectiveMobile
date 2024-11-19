const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Shop  = sequelize.define('shop', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
}) 

const Production = sequelize.define('production', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    plu: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false}, 
    quantity: {type: DataTypes.INTEGER, defaultValue: 0},
}) 

const Shelf  = sequelize.define('shelf', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const Order  = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const ShelfProduction = sequelize.define('shelf_production', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const OrderProduction = sequelize.define('shelf_production', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
 
Shop.hasMany(Production)
Production.belongsTo(Shop)

Shop.hasMany(Shelf)
Shelf.belongsTo(Shop) 

Shop.hasMany(Order)
Order.belongsTo(Shop)

Shelf.belongsToMany(Production, {through: ShelfProduction, foreignKey: 'production_id'})
Production.belongsToMany(Shelf, {through: ShelfProduction, foreignKey: 'shelf_id'})

Order.belongsToMany(Production, {through: OrderProduction, foreignKey: 'production_id'})
Production.belongsToMany(Order, {through: OrderProduction, foreignKey: 'order_id'})
 
module.exports = { 
    Production,
    Shop,
    Shelf,
    Order,
    ShelfProduction,
    OrderProduction,
}


