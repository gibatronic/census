var chalk = require('chalk');

var print = function(repositories) {
  repositories.forEach(printRepository);
  process.stdout.write('\n');
};

var printRepository = function(repository) {
  var message = [
    '',
    `  ${chalk.gray('•')}  ${chalk.blue(repository.get('full_name'))}`,
    `  ${chalk.gray('│')}`,
    `  ${chalk.gray('├╴')} forks:  ${chalk.blue(repository.get('forks_count'))}`,
    `  ${chalk.gray('├╴')} issues: ${chalk.blue(repository.get('open_issues_count'))}`,
    `  ${chalk.gray('╰╴')} stars:  ${chalk.blue(repository.get('stargazers_count'))}`,
    ''
  ];

  process.stdout.write(message.join('\n'));
};

module.exports = print;
