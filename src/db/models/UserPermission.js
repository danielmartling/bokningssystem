// src/db/models/UserRole.js
module.exports = (sequelize) => {
    const { DataTypes } = require("sequelize");

    return sequelize.define(
        "user_permission",
        {
            user_id: { type: DataTypes.INTEGER, allowNull: false },
            permission_id: { type: DataTypes.INTEGER, allowNull: false }
        },
        {
            timestamps: true,
            paranoid: true
        }
    );
};
