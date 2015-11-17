var chalk = require('chalk');

var print = function(repositories) {
  repositories.forEach(printRepository);
  process.stdout.write('\n');
};

var printRepository = function(repository, index) {
  var message = [
    '',
    `  ${chalk.gray((index + 1) + '.')} ${chalk.blue(repository.get('full_name'))}`,
    `     forks: ${chalk.blue(repository.get('forks_count'))}  open issues: ${chalk.blue(repository.get('open_issues_count'))}  stars: ${chalk.blue(repository.get('stargazers_count'))}`,
    ''
  ];

  process.stdout.write(message.join('\n'));
};

module.exports = print;
