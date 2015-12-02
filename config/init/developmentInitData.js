
// TODO: not work
module.exports.createTestData = function() {
  var categorys = [{
    name: 'work'
  }, {
    name: 'break'
  }];

  Category.create(categorys);
};
