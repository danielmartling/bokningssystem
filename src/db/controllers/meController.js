// src/db/controllers/meController.js
const { models } = require("../index");
const User = models.User;
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');

// GET /me
async function getMe(req, res) {
    const me = await User.findOne({
        where: {
            user_id: req.signedCookies.userId
        },
        include: [
            {
                model: models.Role,
                attributes: ["role"],
                through: { attributes: [] }
            }
        ]
    });
    res.json(me);
}

// Put /me/displayname
async function updateDisplayname(req, res) {
    const me = await User.findOne({
        where: {
            user_id: req.signedCookies.userId
        }
    });
    me.set({
        displayname: req.body.displayname,
    })
    await me.save();
    res.json(me);
}

// Put /me/password
async function updatePassword(req, res) {
    const me = await User.findOne({
        where: {
            user_id: req.signedCookies.userId
        }
    });

    const match = await bcrypt.compare(req.body.oldPassword.trim(), me.password_hash);
    if (!match) {
        return res.status(401).json({ error: 'Old password is incorrect' });
    }

    const newHash = await bcrypt.hash(req.body.newPassword.trim(), 10);
    me.set({
        password_hash: newHash,
    })

    await me.save();
    res.json(me);
}

module.exports = { getMe, updateDisplayname, updatePassword };