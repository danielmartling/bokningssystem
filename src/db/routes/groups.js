// src/routes/groups.js
const express = require("express");
const router = express.Router();
const groupsController = require('../controllers/groupsController');

router.get('/', groupsController.getAllGroups);
router.post('/', groupsController.createGroup);

module.exports = router;