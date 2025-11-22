// src/db/controllers/usersController.js
const { models } = require("../index");
const User = models.User;
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');

// GET /users
async function getAllUsers(req, res) {
    const users = await User.findAll({
        include: [
            {
                model: models.Role,
                attributes: ["role"],
                through: { attributes: [] }
            }
        ]
    });
    res.json(users);
}



module.exports = { getAllUsers };