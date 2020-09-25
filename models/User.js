module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        userName: DataTypes.STRING,
        password:DataTypes.STRING
    });

    User.associate = function(models) {
        // add associations here
        User.hasMany(models.Turtle);
    };

    return User;
};