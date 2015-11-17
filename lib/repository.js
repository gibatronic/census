var _ = require('lodash');
var persist = require('node-persist');

var Repository = function(data) {
  this.data = _.pick(data, this.keys);
};

Repository.prototype = {
  data: { },

  keys: [
    'id',
    'full_name',
    'forks_count',
    'open_issues_count',
    'stargazers_count',
    'subscribers_count'
  ],

  get: function(key) {
    return this.data[key];
  }
};

module.exports = Repository;
