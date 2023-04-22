'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate(models) {
    }
  };
  Pet.init({
    name: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    race: DataTypes.STRING,
    vaccinated: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pet',
    tableName: 'pets',
    timestamps: false
  });
  return Pet;
};