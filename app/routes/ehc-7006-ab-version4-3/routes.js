module.exports = function(router) {
  // Load helper functions


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)


  // CHANGE VERSION TO THE VERSION
  const version = 'ehc-7006-ab-version4-3'
  const base_url = version + "/"

router.post('/' + base_url + "shipping", function(req, res) {

    res.redirect(301, '/' + base_url + 'shipping-batch-numbers');

})

  router.post('/' + base_url + "coldstore", function(req, res) {

    if(req.body.has_coldstore == "yes"){
      res.redirect(301, '/' + base_url + 'coldstore-address');
    }else{
      res.redirect(301, '/' + base_url + 'coldstore-shelf-life');
    }
  })

  router.post('/' + base_url + "coldstore-address", function(req, res) {

      res.redirect(301, '/' + base_url + 'coldstore-shelf-life');

  })

  // this adds query to all pages and will be called if no other get routing exists.
  router.get('/' + base_url + '*', function(req, res) {
    console.log("default get routing page for: "+base_url + req.params[0])
    // clear session info
    if(req.query.destroy=="yes"){
      req.session.destroy();
    }
    res.render(base_url + req.params[0], {
      "query":req.query,
    });
  })










}
