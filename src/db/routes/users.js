// src/routes/users.js
const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const { requireLogin, requireRoles } = require('../../middleware/auth');

router.get('/', requireLogin, requireRoles(["staff", "system-admin"]), usersController.getAllUsers);

module.exports = router;