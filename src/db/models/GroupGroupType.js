module.exports = (sequelize) => {
    const { DataTypes } = require("sequelize");

    return sequelize.define(
        "group_group_types",
        {
            group_id: { type: DataTypes.INTEGER, allowNull: false },
            type_id: { type: DataTypes.INTEGER, allowNull: false }
        },
        { timestamps: false }
    );
};
