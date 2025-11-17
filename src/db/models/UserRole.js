// src/db/models/UserRole.js
module.exports = (sequelize) => {
    const { DataTypes } = require("sequelize");

    return sequelize.define(
        "user_role",
        {
            user_id: { type: DataTypes.INTEGER, allowNull: false },
            role_id: { type: DataTypes.INTEGER, allowNull: false }
        },
        { timestamps: false }
    );
};
