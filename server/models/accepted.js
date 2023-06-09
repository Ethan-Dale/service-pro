const {DataTypes} = require('sequelize')
const {sequelize} = require("../util/database")

module.exports = {
    SavedJob: sequelize.define('savedJob', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        
    })
}
