// src/db/controllers/programDayController.js
const { models } = require("../index");
const ProgramDay = models.ProgramDay;
const { Op } = require("sequelize");

// GET /programday/byday/:day
async function getProgramDay(req, res) {
    const [programDay, created] = await ProgramDay.findOrCreate({ where: { day: req.params.day } });
    res.json(programDay);
}

// PUT /programday/byday/:day
async function editProgramDay(req, res) {
    const programDay = await ProgramDay.findOne({ where: { day: req.params.day } });
    programDay.set({
        title: req.body.title,
        message: req.body.message,
    })
    await programDay.save();
    res.json(programDay);
}

module.exports = { getProgramDay, editProgramDay };