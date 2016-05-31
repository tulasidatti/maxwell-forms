module.exports = function(sequelize, DataTypes) {

	var User = sequelize.define("User", {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true 
		},
		username: {
			type: DataTypes.STRING, 
			allowNull: false
		},
		password: {
			type: DataTypes.STRING, 
			allowNull: false
		},
		email: {
			type: DataTypes.STRING, 
			allowNull: false
		},			
		dateCreated: {
			type: DataTypes.INTEGER(11), 
			defaultValue: null
		},
		dateModified: {
			type: DataTypes.INTEGER(11), 
			defaultValue: null
		},		
		status: {
			type: DataTypes.BOOLEAN, 
			defaultValue: null
		 } 
	},
	{	
		timestamps: false,
		freezeTableName: true  
	});

	return User;
};

