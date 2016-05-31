module.exports = function(sequelize, DataTypes) {

	var FormTemplateToVendor = sequelize.define("FormTemplateToVendor", {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true 
		},							
		vendorId: {
			type: DataTypes.STRING,
			defaultValue: null,
		}
	},
	{
		classMethods: {
			associate: function(models) {
				FormTemplateToVendor.belongsTo(models.FormTemplate);
			}
		},
		timestamps: false,
		freezeTableName: true  
	});

	return FormTemplateToVendor;
};	