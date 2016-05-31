module.exports = function(sequelize, DataTypes) {

	var FormTemplate = sequelize.define("FormTemplate", {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true 
		},
		filePath: {
			type: DataTypes.STRING, 
			defaultValue: null
		},
		eTag: {
			type: DataTypes.STRING, 
			defaultValue: null
		},
		formType: {
			type: DataTypes.STRING, 
			defaultValue: null
		},
		notes: DataTypes.TEXT,
		name: {
			type: DataTypes.STRING, 
			allowNull: false,
		},
		dateCreated: {
			type: DataTypes.INTEGER(11), 
			defaultValue: null
		},
		dateModified: {
			type: DataTypes.INTEGER(11), 
			defaultValue: null
		},		
		active: {
			type: DataTypes.BOOLEAN, 
			defaultValue: null
		 } 
	},
	{
		classMethods: {
			associate: function(models) {				
				FormTemplate.hasMany(models.FormTemplateToProduct, {					
					onDelete: "CASCADE"
				}),
				FormTemplate.hasMany(models.FormTemplateToVendor, {					
					onDelete: "CASCADE"
				}),
				FormTemplate.hasMany(models.FormTemplateToState, {					
					onDelete: "CASCADE"
				})
			}
		},
	
		timestamps: false,
		freezeTableName: true  
	});

	return FormTemplate;
};

