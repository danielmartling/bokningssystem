// src/routes/users.js
const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const { requireLogin, requireRoles, requirePermissions } = require('../../middleware/auth');

router.get(
    '/',
    requireLogin, 
    requireRoles(["staff"]), 
    usersController.getAllUsers
);

router.put(
    "/changePassword",
    requireLogin,
    requirePermissions(["program-admin", "system-admin", "program-booker"]),
    usersController.changePassword
);

router.put(
    "/updateUser",
    requireLogin,
    requirePermissions(["program-admin", "system-admin", "program-booker"]),
    usersController.updateUser
);

module.exports = router;