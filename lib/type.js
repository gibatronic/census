var type = function(object) {
  return Object.prototype
               .toString
               .call(object)
               .substr(8)
               .slice(0, -1);
};

type.is = function(object, kind) {
  return type(object) == kind;
};

type.isString = function(object) {
  return type.is(object, 'String');
};

module.exports = type;
