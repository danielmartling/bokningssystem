// src/db/controllers/groupsController.js
const { models } = require("../index");
const { Op } = require("sequelize");

// GET /groups
async function getAllGroups(req, res) {
    const groups = await models.Group.findAll({
        include: [
            {
                model: models.GroupType,
                attributes: ["name"],
                through: { attributes: [] }
            },
            {
                model: models.Troop,
                attributes: ["troop_id", "troop_name"],
                include: [
                    {
                        model: models.TroopLabel,
                        attributes: ["label"]
                    }
                ]
            }
        ]
    });
    res.json(groups);
}

// GET /groups/byday:day
async function getGroupsByDay(req, res) {
    const day = req.params.day;

    const groups = await models.Group.findAll({
        where: {
            arrival_date: { [Op.lte]: day },
            departure_date: { [Op.gte]: day }
        },
        include: [
            {
                model: models.GroupType,
                attributes: ["name"],
                through: { attributes: [] }
            },
            {
                model: models.Troop,
                attributes: ["troop_id", "troop_name"],
                include: [
                    { model: models.TroopLabel, attributes: ["label"] }
                ]
            }
        ]
    });

    res.json(groups);
}


// POST /groups
async function createGroup(req, res) {
    const group = await models.Group.create(req.body);
    await group.setGroupTypes(req.body.types);
    res.json(group);
}

module.exports = { getAllGroups, getGroupsByDay, createGroup };