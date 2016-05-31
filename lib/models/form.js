// SAMPLE MODEL - feel free to modify/delete
// https://sequelize.readthedocs.org/en/latest/docs/models-definition/
module.exports = function(sequelize, DataTypes) {
  var Form = sequelize.define("Form", {
    name: DataTypes.STRING
  });

  return Form;
};