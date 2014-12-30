var Blogs = function () {

  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Blog.all(function(err, blogs) {
      if (err) {
        throw err;
      }
      self.respond(
          {'blogs': blogs},
          {
            format:   'html',
            template: 'app/views/blogs/index'
          }
      );
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , blog = geddy.model.Blog.create(params);

    if (!blog.isValid()) {
      this.respondWith(blog);
    }
    else {
      blog.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(blog, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Blog.get({slug:params.blog_slug}, function(err, blog) {

      if (err) {
        throw err;
      }
      if (!blog) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(blog);
      }

    });

    geddy.model.Blog.first(params.id, function(err, blog) {
      if (err) {
        throw err;
      }
      if (!blog) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(blog);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Blog.first(params.id, function(err, blog) {
      if (err) {
        throw err;
      }
      if (!blog) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(blog);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Blog.first(params.id, function(err, blog) {
      if (err) {
        throw err;
      }
      blog.updateProperties(params);

      if (!blog.isValid()) {
        self.respondWith(blog);
      }
      else {
        blog.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(blog, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Blog.first(params.id, function(err, blog) {
      if (err) {
        throw err;
      }
      if (!blog) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Blog.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(blog);
        });
      }
    });
  };

};

exports.Blogs = Blogs;
