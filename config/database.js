const {Sequelize} = require('sequelize')

require(`dotenv`).config() //? Loads environment variables from .env file. 
//! the .env file does not need to be in the node_modules folder, just in the same Node environment
//! the config() method provided by `dotenv` is used to load the environment variables

const sequelize = new Sequelize(process.env.POSTGRESURI)

module.exports = sequelize