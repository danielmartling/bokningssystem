// src/db/controllers/activitiesController.js
const { models } = require("../index");
const Activity = models.Activity;
const Category = models.ActivityCategory;
const Tag = models.ActivityTag;
const { Op } = require("sequelize");

// GET /activities
async function getAllActivities(req, res) {
    const activities = await Activity.findAll({
        include: [
            {
                model: Category,
                attributes: ["category_id"],
            },
            {
                model: Tag,
                attributes: ["tag_id"],
            }
        ]
    });
    res.json(activities);
}

// GET /activities/byCategory
async function getActivitiesByCategory(req, res) {
    const categories = await Category.findAll({
        attributes: ["category_id", "name", "order"],
        include: [
            {
                model: Activity,
            }
        ]
    });
    res.json(categories);
}


module.exports = {
    getAllActivities,
    getActivitiesByCategory
};