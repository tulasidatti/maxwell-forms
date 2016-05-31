module.exports = {
	LOGGING_THRESHOLD: 'info',
	MYSQL_URL: '',
	LOGGING_BASEDIR: process.cwd() + '/test/logs/',
	LOGGING: {
		DEFAULT: 'default.log',
		ERROR: 'error.log',
		FRONTEND: 'frontend.log',
	},
	DB_USERNAME: 'root',
	DB_PASSWORD: 'root',
	DB_NAME: 'database_test',
	DB_OPTIONS: {
		dialect: 'mysql',
		host: '127.0.0.1',
		port: '',
		protocol: '',
		//logging: false,
		benchmark: true,
		pool: {
			maxConnections: 10
		},
		typeValidation: true,
		retry: {
			max: 10
		}
	},
	AWS_BUCKET: 'tulasidatti',
	AWS_ACCESSKEYID: 'AKIAIQBRPD6ATCSN5VEQ',
	AWS_SECRETACCESSKEY: '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'
}