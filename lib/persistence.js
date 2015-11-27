var fs = require('fs');
var path = require('path');

var access = function(options) {
  var executor = function(resolve, reject) {
    var callback = function(exception) {
      if (exception) {
        options.exception = exception;
        return reject(options);
      }

      delete options.exception;
      resolve(options);
    };

    fs.access(options.file, fs.R_OK | fs.W_OK, callback);
  };

  return new Promise(executor);
};

var enoent = function(options) {
  var executor = function(resolve, reject) {
    if (options.exception.code != 'ENOENT') {
      return reject(options);
    }

    var callback = function(exception) {
      if (exception && exception.code != 'EEXIST') {
        options.exception = exception;
        return reject(options);
      }

      delete options.exception;
      resolve(options);
    };

    fs.mkdir(path.dirname(options.file), 0700, callback);
  };

  return new Promise(executor);
};

var Persistence = function(name) {
  this.file = path.join(
    process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'],
    '.census',
    name.replace(/\//g, '-') + '.json'
  );
};

Persistence.prototype = {
  file: null,

  get: function() {
    var options = {
      data: { },
      file: this.file
    };

    return access(options).catch(enoent).then(read);
  },

  set: function(data) {
    var options = {
      data: data,
      file: this.file
    };

    return access(options).catch(enoent).then(write);
  }
};

var read = function(options) {
  var executor = function(resolve, reject) {
    var callback = function(exception, data) {
      if (exception) {
        if (exception.code == 'ENOENT') {
          delete options.exception;
          return resolve(options);
        } else {
          options.exception = exception;
          return reject(options);
        }
      }

      try {
        data = JSON.parse(data);
      } catch (exception) {
        options.exception = exception
        return reject(options);
      }

      delete options.exception;
      options.data = data;
      resolve(options);
    };

    fs.readFile(options.file, callback);
  };

  return new Promise(executor);
};

var write = function(options) {
  var executor = function(resolve, reject) {
    try {
      data = JSON.stringify(options.data, undefined, 2);
    } catch (exception) {
      options.exception = exception;
      return reject(options);
    }

    var callback = function(exception) {
      if (exception) {
        options.exception = exception;
        return reject(options);
      }

      delete options.exception;
      resolve(options);
    };

    fs.writeFile(options.file, data, {
      mode: 0600
    }, callback);
  };

  return new Promise(executor);
};

module.exports = Persistence;
