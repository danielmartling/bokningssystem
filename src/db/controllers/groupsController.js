const { models } = require("../index");

// GET /users
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

// POST /users
async function createGroup(req, res) {
    const group = await models.Group.create(req.body);
    await group.setGroupTypes(req.body.types);
    res.json(group);
}

module.exports = { getAllGroups, createGroup };