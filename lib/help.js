var message = [
  '',
  '  Usage:',
  '    census [options] <owner/repo>...',
  '',
  '  Options:',
  '    -h, --help     print usage information',
  '    -v, --version  print census version',
  '',
  ''
];

var help = function() {
  process.stdout.write(message.join('\n'));
};

module.exports = help;
