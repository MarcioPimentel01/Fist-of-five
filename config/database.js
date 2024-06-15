const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const POSTGRESURL = process.env.POSTGRESURL;
console.log(`POSTGRESURL: ${POSTGRESURL}`); // Debugging line to ensure POSTGRESURL is loaded

if (!POSTGRESURL) {
  throw new Error("POSTGRESURL environment variable is not set");
}

const sequelize = new Sequelize(POSTGRESURL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Needed for connecting to certain PostgreSQL servers like Render
    }
  }
});

module.exports = sequelize;
