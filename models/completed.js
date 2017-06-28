'use strict';
module.exports = function(sequelize, DataTypes) {
  var completed = sequelize.define('completed', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return completed;
};