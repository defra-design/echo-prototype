module.exports = function(router) {
  // Load helper functions


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)


  // CHANGE VERSION TO THE VERSION
  const version = 'ehc-7006-ab-version4-1'
  const base_url = version + "/"
  function countProperties (obj) {
      var count = 0;
      for (var property in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, property)) {
              count++;
          }
      }
      return count;
  }
  function getBlankFields(obj){
    var arr = []
      for (var property in obj) {
        console.log("Checking:" + property)
        if(obj[property] == "" && property!="saveAndContinue" &&  property != "skip_answers" ){
          console.log("adding:" + property)
          arr.push(property)
        }
      }
      return arr
  }
  router.post('/' + base_url + "15", function(req, res) {
    var page = "importer_details"
    //check if anthing is empty
    req.session.data.empty = getBlankFields(req.body)

    // Show error message if the user has left anything blank and not skipped
    if(req.session.data.empty.length > 0 && !req.body.skip_answers.includes('skip')){
      return res.redirect(301, '/' + base_url + '15?hasError=yes');
    }
    // add this page to the skipped list
    if(!req.session.data.skipped.includes(page)){
    req.session.data.skipped.push(page);
}
    //reset the sesson data object for "empty"
    req.session.data.empty=[]
    if(req.query.change == "yes"){
      res.redirect(301, '/' + base_url + 'check-your-answers');
    }else{
      res.redirect(301, '/' + base_url + 'check-your-progress');
    }
  })
  // Base page router
  router.post('/' + base_url + "7", function(req, res) {
    var page = "slaughterhouse_details";
    req.session.data.empty = []
    //check if anthing is empty
    req.session.data.empty = getBlankFields(req.body)

    // Show error message if the user has left anything blank and not skipped
    if(req.session.data.empty.length > 0 && !req.body.skip_answers.includes('skip')){
      // ensure this page has been removed from the skipped list (used in check your progress)
      req.session.data.skipped = req.session.data.skipped.filter(e => e !== page)
      return res.redirect(301, '/' + base_url + '7?hasError=yes');
    }
    // add this page to the skipped list
    if(!req.session.data.skipped.includes(page)){
    req.session.data.skipped.push(page);
}
    //reset the sesson data object for "empty"
    req.session.data.empty = []
    if(req.query.change == "yes"){
      res.redirect(301, '/' + base_url + 'check-your-answers');
    }else if(req.query.change == "product"){
      res.redirect(301, '/' + base_url + '11-plus');
    }else{
      res.redirect(301, '/' + base_url + '9');
    }

  })
  router.post('/' + base_url + "9", function(req, res) {
    var page = "cutting_details";
    req.session.data.empty = []
    //check if anthing is empty
    req.session.data.empty = getBlankFields(req.body)

    // Show error message if the user has left anything blank and not skipped
    if(req.session.data.empty.length > 0 && !req.body.skip_answers.includes('skip')){
      // ensure this page has been removed from the skipped list (used in check your progress)
      req.session.data.skipped = req.session.data.skipped.filter(e => e !== page)
      return res.redirect(301, '/' + base_url + '9?hasError=yes');
    }
    // add this page to the skipped list
    if(!req.session.data.skipped.includes(page)){
    req.session.data.skipped.push(page);
}
    //reset the sesson data object for "empty"
    req.session.data.empty = []
    if(req.query.change == "yes"){
      res.redirect(301, '/' + base_url + 'check-your-answers');
    }else if(req.query.change == "product"){
      res.redirect(301, '/' + base_url + '11-plus');
    }else{
      res.redirect(301, '/' + base_url + '11-minus');
    }

  })
  router.post('/' + base_url + "11-minus", function(req, res) {
    var page = "product_details";
    req.session.data.empty = []
    //check if anthing is empty
    req.session.data.empty = getBlankFields(req.body)
    // Show error message if the user has left anything blank and not skipped
    if(req.session.data.empty.length > 0 && !req.body.skip_answers.includes('skip')){
      // ensure this page has been removed from the skipped list (used in check your progress)
      req.session.data.skipped = req.session.data.skipped.filter(e => e !== page)
      return res.redirect(301, '/' + base_url + '11-minus?hasError=yes');
    }
    // add this page to the skipped list
    if(!req.session.data.skipped.includes(page)){
    req.session.data.skipped.push(page);
}
    //reset the sesson data object for "empty"
    req.session.data.empty = []
    if(req.query.change == "yes"){
      res.redirect(301, '/' + base_url + 'check-your-answers');
    }else{
      res.redirect(301, '/' + base_url + '11-plus');
    }

  })
  router.post('/' + base_url + "11", function(req, res) {
    var page="coldstore_details";
    req.session.data.empty = []
    //check if anthing is empty
    req.session.data.empty = getBlankFields(req.body)

    // Show error message if the user has left anything blank and not skipped
    if(req.session.data.empty.length > 0 && !req.body.skip_answers.includes('skip')){
      // ensure this page has been removed from the skipped list (used in check your progress)
      req.session.data.skipped = req.session.data.skipped.filter(e => e !== page)
      return res.redirect(301, '/' + base_url + '11?hasError=yes');
    }
    // add this page to the skipped list
    if(!req.session.data.skipped.includes(page)){
    req.session.data.skipped.push(page);
}
    //reset the sesson data object for "empty"
    req.session.data.empty = []
    if(req.query.change == "yes"){
      res.redirect(301, '/' + base_url + 'check-your-answers');
    }else{
      res.redirect(301, '/' + base_url + 'check-your-progress');
    }

  })
  router.post('/' + base_url + "13", function(req, res) {
    var page = "shipment_details";
    req.session.data.empty = []
    //check if anthing is empty
    req.session.data.empty = getBlankFields(req.body)

    // Show error message if the user has left anything blank and not skipped
    if(req.session.data.empty.length > 0 && !req.body.skip_answers.includes('skip')){
      // ensure this page has been removed from the skipped list (used in check your progress)
      req.session.data.skipped = req.session.data.skipped.filter(e => e !== page)
      return res.redirect(301, '/' + base_url + '13?hasError=yes');
    }
    // add this page to the skipped list
    if(!req.session.data.skipped.includes(page)){
    req.session.data.skipped.push(page);
}
    //reset the sesson data object for "empty"
    req.session.data.empty = []
    if(req.query.change == "yes"){
      res.redirect(301, '/' + base_url + 'check-your-answers');
    }else{
      res.redirect(301, '/' + base_url + '14');
    }

  })
  router.post('/' + base_url + "14", function(req, res) {
    var page = "transport_details"
    req.session.data.empty = []
    //check if anthing is empty
    req.session.data.empty = getBlankFields(req.body)

    // Show error message if the user has left anything blank and not skipped
    if(req.session.data.empty.length > 0 && !req.body.skip_answers.includes('skip')){
      // ensure this page has been removed from the skipped list (used in check your progress)
      req.session.data.skipped = req.session.data.skipped.filter(e => e !== page)
      return res.redirect(301, '/' + base_url + '14?hasError=yes');
    }
    // add this page to the skipped list
    if(!req.session.data.skipped.includes(page)){
        if(!req.session.data.skipped.includes(page)){
    req.session.data.skipped.push(page);
}
    }
    //reset the sesson data object for "empty"
    req.session.data.empty = []
    if(req.query.change == "yes"){
      res.redirect(301, '/' + base_url + 'check-your-answers');
    }else{
      res.redirect(301, '/' + base_url + 'check-your-progress');
    }

  })
  router.post('/' + base_url + "5", function(req, res) {
    var page = "certification_timings"
    req.session.data.empty = []
    //check if anthing is empty
    req.session.data.empty = getBlankFields(req.body)
    // Show error message if the user has left anything blank and not skipped
    if(req.session.data.empty.length > 0 && !req.body.skip_answers.includes('skip')){
      // ensure this page has been removed from the skipped list (used in check your progress)
      req.session.data.skipped = req.session.data.skipped.filter(e => e !== page)
      return res.redirect(301, '/' + base_url + '5?hasError=yes');

    }
    // add this page to the skipped list
    if(!req.session.data.skipped.includes(page)){
    req.session.data.skipped.push(page);
}
    //reset the sesson data object for "empty"
    req.session.data.empty = []
    if(req.query.change == "yes"){
      res.redirect(301, '/' + base_url + 'check-your-answers');
    }else{
      res.redirect(301, '/' + base_url + 'check-your-progress');
    }

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
