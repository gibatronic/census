var _ = require('lodash');
var async = require('async');
var Repository = require('./repository.js');
var request = require('request');

var executor = function(repositories, resolveExecutor, rejectExecutor) {
  async.map(repositories, getData, gotData.bind(this, resolveExecutor, rejectExecutor));
};

var getRepositories = function(repositories) {
  return new Promise(executor.bind(this, repositories));
};

var getData = function(repository, respondGetData) {
  if (repository instanceof Repository) {
    return respondOwnerRepositories(null, item);
  }

  var options = {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'census'
    },
    url: `https://api.github.com/repos/${escape(repository)}`
  };

  request(options, parse.bind(this, respondGetData, repository));
};

var gotData = function(resolveExecutor, rejectExecutor, exception, repositories) {
  if (exception) {
    return rejectExecutor(exception);
  }

  resolveExecutor(repositories);
};

var parse = function(respondGetData, repository, exception, response, data) {
  if (exception) {
    return respondGetData(exception, repository);
  }

  if (response.statusCode != 200) {
    try {
      data = JSON.parse(data);
    } catch (exception) {
      data = { };
    }

    exception = new Error(data.message || 'Unable to get repository');
    return respondGetData(exception, repository);
  }

  try {
    data = JSON.parse(data);
  } catch (exception) {
    return respondGetData(exception, repository);
  }

  var repository = new Repository(data);
  respondGetData(null, repository);
};

module.exports = getRepositories;
