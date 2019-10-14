module.exports = function(router) {
  // Load helper functions


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)


  // CHANGE VERSION TO THE VERSION
  const version = 'ehc-7006-ab-version4'
  const base_url = version + "/"


  // Base page router


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
