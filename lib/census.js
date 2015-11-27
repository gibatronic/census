var error = require('./error');
var print = require('./print');
var Repository = require('./repository.js');
var request = require('request');
var url = require('url');

var census = function(list) {
  var options = {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'census'
    },
    url: url.format({
      host: 'api.github.com',
      pathname: '/search/repositories',
      protocol: 'https:',
      query: {
        q: 'repo:' + list.join(' repo:')
      }
    })
  };

  request(options, parse);
};

var compare = function(repository) {
  return repository.compare();
};

var initialize = function(data) {
  return new Repository(data);
};

var parse = function(exception, response, data) {
  if (exception) {
    exception.message += ' @ parse';
    return error(exception);
  }

  try {
    data = JSON.parse(data);
  } catch (exception) {
    exception.message += ' @ parse›JSON.parse';
    return error(exception);
  }

  if (response.statusCode != 200) {
    return error(new Error('Unable to get data @ parse'));
  }

  var repositories = data.items.map(initialize);

  Promise.all(repositories.map(compare))
         .then(print.bind(this, repositories))
         .catch(error);
};

module.exports = census;
