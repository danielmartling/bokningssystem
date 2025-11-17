// src/middleware/auth.js

function requireLogin(req, res, next) {
    if (!req.signedCookies || !req.signedCookies.userId) {
        return res.redirect('/');
    }
    next();
}

function requireRoles(roles) {
    return (req, res, next) => {
        const userId = req.signedCookies.userId;
        let userRoles = [];

        if (!userId) {
            return res.status(401).json({ error: 'Not logged in' });
        }

        try {
            userRoles = JSON.parse(req.signedCookies.roles || "[]");
        } catch (error) {
            console.error("Invalid roles cookie", error);
            return res.status(400).json({ error: 'Invalid roles data' });
        }

        const hasRole = roles.some(role => userRoles.includes(role));

        if (!hasRole) {
            return res.status(403).json({ error: 'Forbidden: insufficient role' });
        }

        next();
    };
}

module.exports = { requireLogin, requireRoles };