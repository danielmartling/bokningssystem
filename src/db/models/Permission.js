// src/db/models/Role.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Permission = sequelize.define(
        "permission",
        {
            permission_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            permission: { type: DataTypes.STRING, allowNull: false, unique: true },
            description: { type: DataTypes.STRING }
        },
        {
            timestamps: true,
            paranoid: true
        }
    );

    Permission.associate = (models) => {
        Permission.belongsToMany(models.User, {
            through: models.UserPermission,
            foreignKey: "permission_id",
        });
    };

    return Permission;
};