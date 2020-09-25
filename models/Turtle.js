module.exports = function(sequelize, DataTypes) {
    var Turtle = sequelize.define('Turtle', {
        // add properites here
        name: DataTypes.STRING
    });

    Turtle.associate = function(models) {
        // add associations here
        Turtle.belongsTo(models.User);
    };

    return Turtle;
};