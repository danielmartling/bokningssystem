// src/db/models/ProgramDay.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const ProgramDay = sequelize.define(
        "program_day",
        {
            day_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            day: { type: DataTypes.DATEONLY, allowNull: false, unique: true },
            title: { type: DataTypes.STRING },
            subtitle: { type: DataTypes.STRING }
        },
        {
            timestamps: true,
            paranoid: true
        }
    );

    return ProgramDay;
};