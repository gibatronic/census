var chalk = require('chalk');

var print = function(repositories) {
  repositories.forEach(printRepository);
  process.stdout.write('\n');
};

var printRepository = function(repository, index) {
  var message = [
    '',
    `  ${chalk.gray((index + 1) + '.')} ${chalk.blue(repository.full_name)}`,
    `     forks: ${chalk.blue(repository.forks_count)}  open issues: ${chalk.blue(repository.open_issues_count)}  stars: ${chalk.blue(repository.stargazers_count)}`,
    ''
  ];

  process.stdout.write(message.join('\n'));
};

module.exports = print;
