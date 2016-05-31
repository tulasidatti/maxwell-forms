module.exports = function(sequelize, DataTypes) {

	var FormTemplateToState = sequelize.define("FormTemplateToState", {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true 
		},				
		stateId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		}
	},
	{
		classMethods: {
			associate: function(models) {
				FormTemplateToState.belongsTo(models.FormTemplate)
			}
		},

		timestamps: false,
		freezeTableName: true  
	});

	return FormTemplateToState;
};	