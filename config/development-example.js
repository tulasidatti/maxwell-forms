module.exports = {
	LOGGING_THRESHOLD: 'info',
	LOGGING_BASEDIR: process.cwd() + '/logs/',
	LOGGING: {
		DEFAULT: 'default.log',
		ERROR: 'error.log',
		FRONTEND: 'frontend.log',
	},
	CWD: process.cwd(),
	DB_USERNAME: 'root',
	DB_PASSWORD: 'testpw',
	DB_NAME: 'database_development',
	DB_OPTIONS: {
		dialect: 'mysql',
		host: 'db', // for docker mysql
		// host: '127.0.0.1', // for local mysql
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
	AWS_BUCKET: 'tulasidatti',
	AWS_ACCESSKEYID: 'AKIAIQBRPD6ATCSN5VEQ',
	AWS_SECRETACCESSKEY: '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'
}