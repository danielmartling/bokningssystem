// src/routes/login.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const { models } = require("../index");
const User = models.User;
const Role = models.Role;
const Group = models.Group;

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                username: username.trim().toLowerCase()
            },
            include: [{
                model: Role,
                attributes: ["role"]
            }]
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        };

        const match = await bcrypt.compare(password.trim(), user.password_hash);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        };

        if (!user.active) {
            return res.status(401).json({ error: 'User is deactivated and can not log in!' });
        }

        const roles = user.roles.map(r => r.role);
        if (roles.length === 0) {
            return res.status(401).json({ error: 'User has no roles!' });
        }

        await user.update({ last_login: new Date() });

        res.cookie('roles',
            JSON.stringify(roles), {
            signed: true,
            httpOnly: true,
            sameSite: 'lax',
        });

        res.cookie('userId', user.user_id, {
            signed: true,
            httpOnly: true,
            sameSite: 'lax',
        });

        res.cookie('username', user.username, {
            signed: true,
            httpOnly: true,
            sameSite: 'lax',
        });



        if (roles.includes("guest")) {
            const group = await Group.findOne({
                where: { booking_number: user.username },
                attributes: ["group_id"]
            });

            if (group) {
                res.cookie("groupId", group.group_id, {
                    signed: true,
                    httpOnly: true,
                    sameSite: "lax"
                });
            }
        }

        res.json({
            message: 'Login successful',
            displayname: user.displayname,
            username: user.username,
            last_login: user.last_login,
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;