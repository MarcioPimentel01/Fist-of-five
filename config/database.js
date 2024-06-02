// const {Sequelize} = require('sequelize')

// require(`dotenv`).config() //? Loads environment variables from .env file. 
// //! the .env file does not need to be in the node_modules folder, just in the same Node environment
// //! the config() method provided by `dotenv` is used to load the environment variables

// const sequelize = new Sequelize(process.env.POSTGRESURI, {dialect: 'postgres'})

// module.exports = sequelize


const Sequelize = require('sequelize');

//? Create a connection object
const sequelize = new Sequelize(
    //? Database name
    `sm_app`,

    //? Username
    `mpimentel`,

    `123change`,
    {
        //?Database location
        host: 'localhost',
        dialect: 'postgres',
    }
);

module.exports = sequelize