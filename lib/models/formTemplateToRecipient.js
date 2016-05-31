module.exports = function(sequelize, DataTypes) {

	var FormTemplateToRecipient = sequelize.define("FormTemplateToRecipient", {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true 
		},
		recipientId: {
			type: DataTypes.INTEGER(11),
			defaultValue: null
		}
	},
	{
		classMethods: {
			associate: function(models) {
				FormTemplateToRecipient.belongsTo(models.FormTemplate);
			}
		},
		
		timestamps: false,
		freezeTableName: true  
	});


	return FormTemplateToRecipient;
};