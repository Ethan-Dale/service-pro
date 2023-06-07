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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user', 
                key: 'id'
            }
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'jobs', 
                key: 'id'
            }
        }
    })
}
