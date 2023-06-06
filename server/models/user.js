const {DataTypes} = require('sequelize')
const {sequelize} = require("../util/database")

module.exports = {
    User: sequelize.define('user',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        hashedPass: DataTypes.STRING,
        userType: DataTypes.ENUM('customer', 'tradesman')
    })
}