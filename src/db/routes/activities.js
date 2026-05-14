// src/routes/activities.js
const express = require("express");
const router = express.Router();
const activitiesController = require('../controllers/activitiesController');
const { requireLogin, requireRoles } = require('../../middleware/auth');

router.get('/', requireLogin, requireRoles(["staff"]), activitiesController.getAllActivities);
router.get('/byCategory', requireLogin, requireRoles(["staff"]), activitiesController.getActivitiesByCategory);

module.exports = router;