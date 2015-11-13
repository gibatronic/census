var error = function(exception) {
  process.stderr.write(`census: ${exception.message}\n`);
};

module.exports = error;
