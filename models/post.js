// !Sequelize ORM post model.

const { DataTypes } = require("sequelize");
const sequelize = require(`./config/database.js`);

const Post = sequelize.define('Post', {
    
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true
        }
        },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
        notEmpty: true
        }
        },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true
        }
        }
    }, {
        timestamps: true 
    });

    module.exports = Post
