var packet = require('../package');

var version = function() {
  process.stdout.write(`v${packet.version}\n`);
};

module.exports = version;
