const {DataTypes} = require('sequelize')
const {sequelize} = require("../util/database")

module.exports = {
    Job: sequelize.define('job',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
       customerId: DataTypes.INTEGER,
       title: DataTypes.STRING,
       description: DataTypes.STRING,
       status: DataTypes.STRING,
       dateTimePosted: DataTypes.DATE,
       dateTimeScheduled: DataTypes.DATE,
       location: DataTypes.STRING
       
    })
}