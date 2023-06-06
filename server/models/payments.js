const {DataTypes} = require('sequelize')
const {sequelize} = require("../util/database")

module.exports = {
    Payment: sequelize.define('payment',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
       jobId: DataTypes.INTEGER,
       customerId: DataTypes.INTEGER,
       tradesmanId: DataTypes.INTEGER,
       amount: DataTypes.DECIMAL,
       dateTimeProcessed: DataTypes.DATE,
       status: DataTypes.STRING

    })
}