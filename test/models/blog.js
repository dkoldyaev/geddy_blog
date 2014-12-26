var assert = require('assert')
  , tests
  , Blog = geddy.model.Blog;

tests = {

  'after': function (next) {
    // cleanup DB
    Blog.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var blog = Blog.create({});
    blog.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
