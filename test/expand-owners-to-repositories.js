var rewire = require('rewire');
var expandOwnersToRepositories = rewire('../lib/expand-owners-to-repositories.js');

describe('expand-owners-to-repositories', function() {
  it('should expand onwer usernames to their repositories', function(done) {
    var inputList = [
      'onwer-a/repository-a',
      'onwer-a/repository-b',
      'onwer-b',
      'onwer-c/repository-a'
    ];

    var outputList = [
      'onwer-a/repository-a',
      'onwer-a/repository-b',
      'onwer-b/repository-a',
      'onwer-b/repository-b',
      'onwer-b/repository-c',
      'onwer-c/repository-a'
    ];

    expandOwnersToRepositories.__set__({
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
