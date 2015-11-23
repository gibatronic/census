var rewire = require('rewire');
var census = rewire('../lib/census');
var Repository = require('../lib/repository.js');

describe('census', function() {
  it('should parse GitHub data and send it to print', function() {
    var data = {
      items: [{
        id: 1,
        full_name: 'owner/repo-a',
        forks_count: 9,
        open_issues_count: 1,
        stargazers_count: 3,
        subscribers_count: 5
      }, {
        id: 2,
        full_name: 'owner/repo-b',
        forks_count: 2,
        open_issues_count: 0,
        stargazers_count: 5,
        subscribers_count: 0
      }, {
        id: 3,
        full_name: 'owner/repo-c',
        forks_count: 0,
        open_issues_count: 5,
        stargazers_count: 7,
        subscribers_count: 7
      }]
    };

    census.__set__({
      request: function(options, parse) {
        var exception = null;

        var response = {
          statusCode: 200
        };

        parse(exception, response, JSON.stringify(data));
      },

      print: function(repositories) {
        expect(repositories).toEqual([
          new Repository(data.items[0]),
          new Repository(data.items[1]),
          new Repository(data.items[2])
        ]);
      }
    });

    var repositories = [
      'owner/repo-a',
      'owner/repo-b',
      'owner/repo-c'
    ];

    census(repositories);
  });
});
