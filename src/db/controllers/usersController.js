// src/db/controllers/usersController.js
const { models } = require("../index");
const User = models.User;
const Role = models.Role;
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

// Put /users/changePassword
async function changePassword(req, res) {
    const user = await User.findOne({
        where: {
            user_id: req.body.userId
        }
    });

    const newHash = await bcrypt.hash(req.body.newPassword.trim(), 10);
    user.set({
        password_hash: newHash,
    })

    await user.save();
    res.json(user);
}

// Put /users/updateUser
async function updateUser(req, res) {
    const user = await User.findOne({
        where: {
            user_id: req.body.userId
        },
        include: {
            model: Role,
            attributes: ["role"]
        }
    });

    user.set({
        username: req.body.username,
        displayname: req.body.displayname,
        active: req.body.active
    })

    await user.save();

    if (req.body.roles) {
        const roles = await Role.findAll({
            where: {
                role: req.body.roles
            }
        });
        
        await user.setRoles(roles);
    }

    const updatedUser = await User.findByPk(req.body.userId, {
        include: {
            model: Role,
            attributes: ["role"]
        }
    });

    res.json(updatedUser);
}



module.exports = {
    getAllUsers,
    changePassword,
    updateUser
};