var _ = require('lodash');
var async = require('async');
var Repository = require('./Repository.js');
var request = require('request');

var executor = function(list, resolveExecutor, rejectExecutor) {
  async.map(list, getOwnerRepositories, gotOwnerRepositories.bind(this, resolveExecutor, rejectExecutor));
};

var expandOwnersToRepositories = function(list) {
  return new Promise(executor.bind(this, list));
};

var getOwnerRepositories = function(item, respondOwnerRepositories) {
  if (~item.indexOf('/')) {
    return respondOwnerRepositories(null, item);
  }

  var options = {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'census'
    },
    url: `https://api.github.com/users/${escape(item)}/repos?type=owner&sort=full_name&direction=asc`
  };

  request(options, parse.bind(this, respondOwnerRepositories, item));
};

var gotOwnerRepositories = function(resolveExecutor, rejectExecutor, exception, repositories) {
  if (exception) {
    return rejectExecutor(exception);
  }

  repositories = _.flatten(repositories);
  resolveExecutor(repositories);
};

var instantiate = function(data) {
  return new Repository(data);
};

var parse = function(respondOwnerRepositories, item, exception, response, data) {
  if (exception) {
    return respondOwnerRepositories(exception, item);
  }

  if (response.statusCode != 200) {
    try {
      data = JSON.parse(data);
    } catch (exception) {
      data = { };
    }

    exception = new Error(data.message || 'Unable to get owner repositories');
    return respondOwnerRepositories(exception, item);
  }

  try {
    data = JSON.parse(data);
  } catch (exception) {
    return respondOwnerRepositories(exception, item);
  }

  repositories = data.map(instantiate);
  respondOwnerRepositories(null, repositories);
};

module.exports = expandOwnersToRepositories;
