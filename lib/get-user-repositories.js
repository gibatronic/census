var execSync = require('child_process').execSync;
var util = require('util');

var getUserRepositories = function() {
  var gitUserEmail;

  try {
    gitUserEmail = execSync('git config user.email', {
      stdio: ['ignore', 'pipe', 'ignore']
    }).toString().trim();
  } catch (error) {
    throw new getUserRepositories.Error('Unable to query your email from git options.');
  }

  // @todo get the list of repositories for gitUserEmail
};

getUserRepositories.Error = function(message) {
  Error.captureStackTrace(this, this.constructor);

  this.message = message;
  this.name = this.constructor.name;
};

util.inherits(getUserRepositories.Error, Error);
module.exports = getUserRepositories;
