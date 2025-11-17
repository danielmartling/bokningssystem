// src/db/models/User.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define(
        "user",
        {
            user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            username: { type: DataTypes.STRING, allowNull: false, unique: true },
            displayname: { type: DataTypes.STRING, allowNull: false },
            password_hash: { type: DataTypes.STRING, allowNull: false },
            active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
            create_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            last_login: { type: DataTypes.DATE }
        },
        { timestamps: false }
    );

    User.associate = (models) => {
        User.belongsToMany(models.Role, {
            through: models.UserRole,
            foreignKey: "user_id",
        });
    };

    return User;
}; 