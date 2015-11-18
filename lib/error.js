var error = function(exception) {
  process.stderr.write(`census: ${exception.message || 'Unknown error'}\n`);
};

module.exports = error;
