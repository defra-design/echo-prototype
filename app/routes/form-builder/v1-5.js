module.exports = function (router) {

  // Which organisation will lose the certificates?
  router.post('/form-builder/v1-5/move/duplicate-organisation', function (req, res) {		

		// Make sure the user chooses an option
		if (req.body.fromOrganisationName == undefined) {
			res.redirect('/form-builder/v1-5/move/duplicate-organisation?paginationRequired=true&page1=true&error=true&error2=true');
		}
		// Success
		else {			

      if (req.query.returnURL) {
        res.redirect('/form-builder/v1-5/move/' + req.query.returnURL);
      }
      else {
        res.redirect('/form-builder/v1-5/move/new-owner-organisation?paginationRequired=true&page1=true');
      }
			
		}
		
	});
  // NON JAVASCRIPT - Deal with the non JavaScript scenario (e.g. POST) for users entering an empty search on the radio buttons
	router.get('/form-builder/v1-5/move/duplicate-organisation-non-javascript-post', function (req, res) {		

		// Make sure the user chooses an option
		if (req.query.searchOrganisation == "") {
			res.redirect('/form-builder/v1-5/move/duplicate-organisation?paginationRequired=true&page1=true&error=true&error1=true');
		}
		// Success
		else {
			res.redirect('/form-builder/v1-5/move/duplicate-organisation?paginationRequired=true&page1=true');
		}
		
	});

  // Which organisation will the certificates be moved to?
  router.post('/form-builder/v1-5/move/new-owner-organisation', function (req, res) {		

		// Make sure the user chooses an option
		if (req.body.toOrganisationName == undefined) {
			res.redirect('/form-builder/v1-5/move/new-owner-organisation?paginationRequired=true&page1=true&error=true&error2=true');
		}
		// Success
		else {	
			res.redirect('/form-builder/v1-5/move/check-your-changes');
		}
		
	});
  // NON JAVASCRIPT - Deal with the non JavaScript scenario (e.g. POST) for users entering an empty search on the radio buttons
	router.get('/form-builder/v1-5/move/new-owner-organisation-non-javascript-post', function (req, res) {		

		// Make sure the user chooses an option
		if (req.query.searchOrganisation == "") {
			res.redirect('/form-builder/v1-5/move/new-owner-organisation?paginationRequired=true&page1=true&error=true&error1=true');
		}
		// Success
		else {
			res.redirect('/form-builder/v1-5/move/new-owner-organisation?paginationRequired=true&page1=true');
		}
		
	});

}