module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)


  // CHANGE VERSION TO THE VERSION
  const version = 'ehc-8270-version2'
  const base_url = version + "/"
  const database = "ehc8270"


router.get('/'+base_url+'certificate/check-your-*', function(req, res) {

  res.render(base_url + '/certificate/check-your-'+req.params[0], {
    "query": req.query,
    "tasks": req.session.data[database]
  });
});


function isDupucate(arr,name){
  for (var i = 0; i < arr.length; i++) {

    if (arr[i].name == name) {
      return true;
    }
  }
  return false;
}

function findPage(arr,id){
  for (var i = 0; i < arr.length; i++) {

    if (arr[i].page == id) {
      return arr[i];
    }
  }
  return false;
}
router.post('/'+base_url+'certificate/exa/certifier-confirm-address', function(req, res) {
  req.session.data.file_id_count += 1
  if(req.body.is_certifier_address_correct =="yes"){
    res.redirect(301, '/' + base_url + 'certificate/exa/certifier-certificate-delevery');
  }else{
    res.redirect(301, '/' + base_url + 'certificate/exa/certifier-new-address');
  }

})
router.post('/'+base_url+'certificate/page', function(req, res, next) {
  req.session.data.completed[req.query.id] = req.query.id
  res.redirect(301, '/' + base_url + 'certificate/'+req.query.next);
})
router.get('/'+base_url+'certificate/page', function(req, res) {
    var id =  parseInt(req.query.id) || 0;
  res.render(base_url+'certificate/page', {
    "query": req.query,
    "page":findPage(req.session.data.ehc8270,id)
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url + '/certificate/page');
      }
      throw err;
    }
    res.send(html);
  })
})

router.get('/'+base_url+'certificate/supporting-documents', function(req, res) {

  if(req.query.delete){
    tools.removeFromList(req.session.data.uploaded_files,req.query.delete)
  }
  res.render(base_url+'certificate/supporting-documents', {
    "query": req.query
  }, function(err, html) {
    if (err) {
      if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url + '/certificates/'+ req.params[0] + '/supporting-documents');
      }
      throw err;
    }
    res.send(html);
  })
})
router.post('/'+base_url+'certificate/supporting-documents', function(req, res) {
  req.session.data.file_id_count += 1

  var query = "?"
  // if content add to addtoArray
  var file = req.body.file || "test_supporting_document.docx";
  var description = req.body.file_description || ""
  var id = req.session.data.file_id_count
  if(isDupucate(req.session.data.uploaded_files,file)){
    query+="hasError=true&errorType=duplicate"
  }else{
    // add uploaded file.
    req.session.data.uploaded_files.push({"name":file,"description":description,"ID":id})
  }

  // checkifFileExists()
  res.redirect(301, '/' + base_url + 'certificate/supporting-documents'+query);

})

  // this adds query to all pages and will be called if no other get routing exists.
  router.get('/' + base_url + '*', function(req, res) {
    console.log("default get routing page for: "+base_url + req.params[0])


    res.render(base_url + req.params[0], {
      "query":req.query
    });
  })

}
