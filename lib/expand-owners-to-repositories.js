var request = require('request');

var executor = function(list, resolve, reject) {
  // @todo: iterate list and expand owners to their repositories
};

var expandOwnersToRepositories = function(list) {
  return new Promise(executor.bind(this, list));
};

module.exports = expandOwnersToRepositories;
