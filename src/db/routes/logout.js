// src/routes/logout.js
 

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const cookieOptions = {
        signed: true,
        httpOnly: true,
        sameSite: 'lax'
    };

    res.clearCookie('userId', cookieOptions);
    res.clearCookie('roles', cookieOptions);
    res.clearCookie('groupId', cookieOptions);
    res.clearCookie('username', cookieOptions);

    res.json({ message: 'Logged out' });
});

module.exports = router;