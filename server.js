if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

process.env.TZ = 'UTC';
var boot = require('./lib/boot');

try {
  boot();
} catch (err) {
  console.log(err.stack);
}