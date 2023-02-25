const { DataTypes } = require('sequelize');
module.exports = (app) => {
    const Tasks = app.db.define("Tasks", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
        }
    );
    return  Tasks;
}