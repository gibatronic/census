var chalk = require('chalk');
var pad = require('pad');

var print = function(repositories) {
  repositories.forEach(printRepository);
  process.stdout.write('\n');
};

var printRepository = function(repository) {
  var forks = repository.get('forks_count');
  var issues = repository.get('open_issues_count');
  var stars = repository.get('stargazers_count');

  var fill = Math.max(forks, issues, stars).toString().length;

  var message = [
    '',
    `  ${chalk.gray('•')}  ${chalk.blue(repository.get('full_name'))}`,
    `  ${chalk.gray('│')}`,
    `  ${chalk.gray('├╴')} forks:  ${chalk.blue(pad(fill, forks))}`,
    `  ${chalk.gray('├╴')} issues: ${chalk.blue(pad(fill, issues))}`,
    `  ${chalk.gray('╰╴')} stars:  ${chalk.blue(pad(fill, stars))}`,
    ''
  ];

  process.stdout.write(message.join('\n'));
};

module.exports = print;
