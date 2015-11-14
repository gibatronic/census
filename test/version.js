var rewire = require('rewire');
var version = rewire('../lib/version');

describe('version', function() {
  it('should write census version to stdout', function() {
    version.__set__({
      process: {
        stdout: {
          write: function(chunk) {
            expect(chunk).toMatch(/^v[0-9]+\.[0-9]+\.[0-9]+\n$/);
          }
        }
      }
    });

    version();
  });
});
