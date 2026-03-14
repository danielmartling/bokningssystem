// src/routes/me.js
const express = require("express");
const router = express.Router();
const meController = require('../controllers/meController');
const { requireLogin, requireRoles } = require('../../middleware/auth');

router.get('/', requireLogin, requireRoles(["staff", "system-admin", "guest"]), meController.getMe);

router.put(
    "/updateDisplayname",
    requireLogin,
    requireRoles(["staff", "system-admin", "guest"]),
    meController.updateDisplayname
);

router.put(
    "/updatePassword",
    requireLogin,
    requireRoles(["staff", "system-admin", "guest"]),
    meController.updatePassword
);

module.exports = router;