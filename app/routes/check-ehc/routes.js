module.exports = function(router) {

  // Load helper functions
  var tools = require('../tools.js')
  var nunjucks = require('nunjucks');
  var env = new nunjucks.Environment();


  env.addFilter('shorten', function(str, count) {
    return str.slice(0, count || 5);
  });

//Certificate number post
  router.post("/check-ehc/certificate-number", function(req, res) {
    console.log("Posted");
      res.redirect("/check-ehc/qr");
  });

}
