var chalk = require('chalk');
var pad = require('pad');

var count = function(fill, number) {
  return chalk.blue(pad(fill, number));
};

var difference = function(number) {
  if (number == 0) {
    return '';
  }

  if (number > 0) {
    return chalk.green('+' + number);
  }

  if (number < 0) {
    return chalk.red(number);
  }
};

var print = function(repositories) {
  repositories.forEach(printRepository);
  process.stdout.write('\n');
};

var printRepository = function(repository) {
  var countForks = repository.data.forks_count;
  var countIssues = repository.data.open_issues_count;
  var countStars = repository.data.stargazers_count;

  var deltaForks = repository.delta.forks_count;
  var deltaIssues = repository.delta.open_issues_count;
  var deltaStars = repository.delta.stargazers_count;

  var fillCount = Math.max(countForks, countIssues, countStars).toString().length;

  var message = [
    '',
    `  ${chalk.gray('•')}  ${chalk.blue(repository.data.full_name)}`,
    `  ${chalk.gray('│')}`,
    `  ${chalk.gray('├╴')} forks:  ${count(fillCount, countForks)}  ${difference(deltaForks)}`,
    `  ${chalk.gray('├╴')} issues: ${count(fillCount, countIssues)}  ${difference(deltaIssues)}`,
    `  ${chalk.gray('╰╴')} stars:  ${count(fillCount, countStars)}  ${difference(deltaStars)}`,
    ''
  ];

  process.stdout.write(message.join('\n'));
};

module.exports = print;
