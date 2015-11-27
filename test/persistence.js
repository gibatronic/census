var rewire = require('rewire');
var Persistence = rewire('../lib/persistence');

describe('persistence', function() {
  it('should correctly set the file property when instantiated', function() {
    var revert = Persistence.__set__({
      process: {
        env: {
          HOME: '/fake/path'
        },
        platform: 'darwin'
      }
    });

    var persistence = new Persistence('owner/repo');

    revert();
    expect(persistence.file).toBe('/fake/path/.census/owner-repo.json');
  });

  it('should retrieve data', function(done) {
    var revert = Persistence.__set__({
      fs: {
        R_OK: 4,
        W_OK: 2,

        access: function(path, mode, callback) {
          callback();
        },

        readFile: function(file, callback) {
          callback(undefined, '{"fake": "data"}');
        }
      }
    })

    new Persistence('owner/repo').get().then(function(options) {
      expect(options.data).toEqual({fake: 'data'});
      revert();
      done();
    });
  });

  it('should persist data', function(done) {
    var revert = Persistence.__set__({
      fs: {
        R_OK: 4,
        W_OK: 2,

        access: function(path, mode, callback) {
          callback();
        },

        writeFile: function(file, data, options, callback) {
          callback();
        }
      }
    })

    new Persistence('owner/repo').set({fake: 'data'}).then(function(options) {
      revert();
      done();
    });
  });
});
