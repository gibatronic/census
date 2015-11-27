var _ = require('lodash');
var Persistence = require('./persistence');

var Repository = function(data) {
  this.data = _.pick(data, this.keys);
  this.persistence = new Persistence(this.data.full_name);
};

Repository.prototype = {
  data: { },
  delta: { },

  keys: [
    'id',
    'full_name',
    'forks_count',
    'open_issues_count',
    'stargazers_count'
  ],

  compare: function() {
    var difference = function(options) {
      var count = function(key) {
        return ~key.indexOf('_count');
      };

      var delta = function(key) {
        if (options.data[key] == undefined) {
          options.data[key] = this.data[key];
        }

        this.delta[key] = this.data[key] - options.data[key];
      };

      this.keys
          .filter(count, this)
          .forEach(delta, this);
    };

    return this.retrieve()
               .then(difference.bind(this))
               .then(this.persist.bind(this));
  },

  persist: function() {
    return this.persistence.set(this.data);
  },

  retrieve: function() {
    return this.persistence.get();
  }
};

module.exports = Repository;
