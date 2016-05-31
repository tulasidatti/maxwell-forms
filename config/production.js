module.exports = {
	LOGGING_THRESHOLD: 'error',
	LOGGING_BASEDIR: 'var/log/apps/forms/',
	LOGGING: {
		DEFAULT: 'default.log',
		ERROR: 'error.log',
		FRONTEND: 'frontend.log',
	},
	DB_USERNAME: '',
	DB_PASSWORD: null,
	DB_NAME: 'database_production',
	DB_OPTIONS: {
	dialect: 'mysql',
	host: '127.0.0.1',
	port: '',
	protocol: '',
	benchmark: true,
	pool: {
		maxConnections: 10
	},
	typeValidation: true,
	retry: {
		max: 10
	}
	},
	DATADOG_API_KEY: '',
	DATADOG_APPLICATION_KEY: ''
}