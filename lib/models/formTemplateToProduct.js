module.exports = function(sequelize, DataTypes) {

	var FormTemplateToProduct = sequelize.define("FormTemplateToProduct", {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true 
		},				
		productId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		}
	},
	{
		classMethods: {
			associate: function(models) {
				FormTemplateToProduct.belongsTo(models.FormTemplate);
			}
		},
		
		timestamps: false,
		freezeTableName: true  
	});

	return FormTemplateToProduct;
};	
