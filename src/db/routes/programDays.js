// src/routes/programDays.js
const express = require("express");
const router = express.Router();
const programDayController = require('../controllers/programDayController');
const { requireLogin, requireRoles } = require('../../middleware/auth');

router.get(
    "/byday/:day",
    requireLogin,
    requireRoles(["staff", "system-admin"]),
    programDayController.getProgramDay
);

router.put(
    "/byday/:day",
    requireLogin,
    requireRoles(["system-admin", "program-jour", "program-booker", "program-admin"]),
    programDayController.editProgramDay
);


module.exports = router;