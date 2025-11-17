// src/routes/groups.js
const express = require("express");
const router = express.Router();
const groupsController = require('../controllers/groupsController');
const { requireLogin, requireRoles } = require('../../middleware/auth');

router.get('/', requireLogin, requireRoles(["staff", "system-admin"]), groupsController.getAllGroups);
router.get("/byday/:day", requireLogin, requireRoles(["staff", "system-admin"]), groupsController.getGroupsByDay);
router.post('/', requireLogin, requireRoles(["system-admin", "program-admin", "program-booker"]), groupsController.createGroup);

module.exports = router;