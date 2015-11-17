var rewire = require('rewire');
var expandOwnersToRepositories = rewire('../lib/expand-owners-to-repositories.js');

describe('expand-owners-to-repositories', function() {
  it('should expand onwer usernames to their repositories', function(done) {
    var Repository = function() { };

    var inputList = [
      'onwer-a/repository-a',
      'onwer-a/repository-b',
      'onwer-b',
      'onwer-c/repository-a'
    ];

    var outputList = [
      'onwer-a/repository-a',
      'onwer-a/repository-b',
      new Repository(),
      new Repository(),
      new Repository(),
      'onwer-c/repository-a'
    ];

    expandOwnersToRepositories.__set__({
      Repository: Repository,

      request: function(options, callback) {
        var data = JSON.stringify([{
          full_name: 'onwer-b/repository-a'
        }, {
          full_name: 'onwer-b/repository-b'
        }, {
          full_name: 'onwer-b/repository-c'
        }]);

        var response = {
          statusCode: 200
        };

        callback(null, response, data);
      }
    });

    expandOwnersToRepositories(inputList).then(function(repositories) {
      expect(repositories).toEqual(outputList);
      done();
    });
  });
});
