// src/middleware/redirect.js

const path = require('path');

function roleRedirect(req, res, next) {
    if (!req.signedCookies.roles) {
        // Not logged in
        return res.sendFile(path.join(__dirname, '../../public/login.html'));
    }

    const roles = JSON.parse(req.signedCookies.roles || "[]");

    if (roles.includes('staff')) {
        if (roles.includes('fladan')) {
            return res.sendFile(path.join(__dirname, '../../public/staff/fladan/index.html'));
        } else {
            return res.sendFile(path.join(__dirname, '../../public/staff/index.html'));
        }
    } else if (roles.includes('guest')) {
        return res.sendFile(path.join(__dirname, '../../public/guest/index.html'));
    } else {
        return res.sendFile(path.join(__dirname, '../../public/login.html'));
    }
};

module.exports = { roleRedirect };