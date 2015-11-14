var rewire = require('rewire');
var help = rewire('../lib/help');

describe('help', function() {
  it('should write usage information to stdout', function() {
    help.__set__({
      message: ['message'],
      process: {
        stdout: {
          write: function(chunk) {
            expect(chunk).toBe('message');
          }
        }
      }
    });

    help();
  });
});
