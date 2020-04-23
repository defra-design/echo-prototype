module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)
  const fs = require('fs');

  // CHANGE VERSION TO THE VERSION
  const version = 'beta/v3'
  const base_url = version + "/repeatable-questions-v3"
  const file_url = version + "/core"

  // Load any certificate within "app/data/certificates" folder
  const db = []
  var normalizedPath = require("path").join(__dirname, "../../data/certificates");
  fs.readdirSync(normalizedPath).forEach(function(file) {
    // require("./routes/" + file);
    var d = require("../../data/certificates/" + file);
    var n = file.substring(0, file.lastIndexOf("."));
    var f = {"id":n,"data":d}
    db.push(f)
  });
  router.post('/'+base_url+'*/certificate/page', function(req, res, next) {
    var query = ""
    var product = tools.findPage(tools.getDB(req.session.database,db).data.pages,req.query.id)

    if(product.content.product_page =="yes"){

      req.session.data.products = req.session.data.products || []
      if(req.query.edit){
        tools.updateProduct(req.query.edit,req.session.data.products,product,req.body)
      }else{

        tools.addProduct(req.session.data.products,product,req.body)
      }
    }
    if(req.query.next == "product-list"){
      query+=("id="+req.query.id)
    }
    req.session.data.completed[req.query.id] = req.query.id
    if(req.body.cta == "Save and continue" || req.body.cta == "Save and review"){
      if(product.content.product_page == "yes"){

        res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/'+product.content.next+"&"+query);
      }else{
        var next = req.query.next || product[req.query.id].next

        res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/'+next+"?"+query+'&id='+req.query.id);
      }

    }else{
      res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/page?id='+req.query.id+"&new=yes&product_page=yes&next="+req.query.next);
    }

  })

  router.get('/'+base_url+'*/certificate/product-check-answers', function(req, res) {
    var id = req.query.id || 2;
    var product = tools.findPage(tools.getDB(req.session.database,db).data.pages,id)
    console.log("---------")
    console.log(req.session.data.products)
    console.log("---------")
    res.render(base_url+req.params[0]+'/certificate/product-check-answers', {
      "query": req.query,
      "product":product
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/certificate/product-check-answers');
        }
        throw err;
      }
      res.send(html);
    })
  })
  router.post('/'+base_url+'*/certificate/product-check-answers', function(req, res, next) {
    var product_title= (req.session.data.Processs_category) ? req.session.data.Processs_category +','+req.session.data.product_category : "Pork, Cuts";
    req.session.data.product_loop = req.session.data.product_loop || []
    req.session.data.product_loop.push(product_title)
    res.redirect(301, '/' + base_url +req.params[0]+ '/certificate/product-list?id='+req.query.id);
  })
}
