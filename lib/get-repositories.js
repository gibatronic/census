var _ = require('lodash');
var async = require('async');
var request = require('request');

var executor = function(repositories, resolveExecutor, rejectExecutor) {
  async.map(repositories, getRepositories, gotRepositories.bind(this, resolveExecutor, rejectExecutor));
};

var census = function(repositories) {
  return new Promise(executor.bind(this, repositories));
};

var getRepositories = function(repository, respondGetRepositories) {
  var options = {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'census'
    },
    url: `https://api.github.com/repos/${escape(repository)}`
  };

  request(options, parse.bind(this, respondGetRepositories, repository));
};

var gotRepositories = function(resolveExecutor, rejectExecutor, exception, repositories) {
  if (exception) {
    return rejectExecutor(exception);
  }

  resolveExecutor(repositories);
};

var parse = function(respondGetRepositories, repository, exception, response, data) {
  if (exception) {
    return respondGetRepositories(exception, repository);
  }

  if (response.statusCode != 200) {
    try {
      data = JSON.parse(data);
    } catch (exception) {
      data = { };
    }

    exception = new Error(data.message || 'Unable to get repository');
    return respondGetRepositories(exception, repository);
  }

  try {
    data = JSON.parse(data);
  } catch (exception) {
    return respondGetRepositories(exception, repository);
  }

  data = _.pick(data, [
    'id',
    'full_name',
    'forks_count',
    'network_count',
    'open_issues_count',
    'stargazers_count'
  ]);

  respondGetRepositories(null, data);
};

module.exports = census;
