// src/db/models/Role.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Role = sequelize.define(
        "role",
        {
            role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            role: { type: DataTypes.STRING, allowNull: false, unique: true },
            description: { type: DataTypes.STRING }
        },
        {
            timestamps: true,
            paranoid: true
        }
    );

    Role.associate = (models) => {
        Role.belongsToMany(models.User, {
            through: models.UserRole,
            foreignKey: "role_id",
        });
    };

    return Role;
};