// src/routes/groups.js
const express = require("express");
const router = express.Router();
const groupsController = require('../controllers/groupsController');
const { requireLogin, requireRoles, requirePermissions } = require('../../middleware/auth');

router.get('/', requireLogin, requireRoles(["staff"]), groupsController.getAllGroups);
router.get("/byday/:day", requireLogin, requireRoles(["staff"]), groupsController.getGroupsByDay);
router.post('/', requireLogin, requirePermissions(["system-admin", "program-admin", "program-booker"]), groupsController.createGroup);

module.exports = router;