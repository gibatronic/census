var rewire = require('rewire');
var error = rewire('../lib/error');

describe('error', function() {
  it('should write the exception\'s message to stderr', function() {
    var exception = new Error('message');

    error.__set__({
      process: {
        stderr: {
          write: function(chunk) {
            expect(chunk).toBe('census: message\n');
          }
        }
      }
    });

    error(exception);
  });
});
