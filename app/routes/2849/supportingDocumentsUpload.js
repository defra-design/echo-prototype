module.exports = function(router) {
    
	// CHANGE ME TO THE VERSION YOU'RE WORKING ON
	var version = "2849";
	
	router.post('/' + version + '/supportingDocumentsUpload/uploadDashboardQ1', function(req, res) {
		if (req.body.uploadSupportingDocuments === "Yes") {
			res.redirect(301, '/' + version + '/supportingDocumentsUpload/uploadDashboard');
		}
		else if (req.body.uploadSupportingDocuments === "No") {
			res.redirect(301, '/' + version + '/checkAndSubmit/checkYourAnswers');
		}
		// If nothing selected force the user to stay on the page and enter a value to continue
		else {
			res.redirect(301, '/' + version + '/supportingDocumentsUpload/uploadDashboardQ1');
		}  
	});

	router.post('/' + version + '/supportingDocumentsUpload/uploadDashboardQ1Yes', function(req, res) {
		if (req.body.uploadSupportingDocuments === "Yes") {
			res.redirect(301, '/' + version + '/supportingDocumentsUpload/uploadDashboard');
		}
		else if (req.body.uploadSupportingDocuments === "No") {
			res.redirect(301, '/' + version + '/checkAndSubmit/checkYourAnswers');
		}
		// If nothing selected force the user to stay on the page and enter a value to continue
		else {
			res.redirect(301, '/' + version + '/supportingDocumentsUpload/uploadDashboardQ1Yes');
		}  
	});

	router.post('/' + version + '/supportingDocumentsUpload/uploadDashboardQ1No', function(req, res) {
		if (req.body.uploadSupportingDocuments === "Yes") {
			res.redirect(301, '/' + version + '/supportingDocumentsUpload/uploadDashboard');
		}
		else if (req.body.uploadSupportingDocuments === "No") {
			res.redirect(301, '/' + version + '/checkAndSubmit/checkYourAnswers');
		}
		// If nothing selected force the user to stay on the page and enter a value to continue
		else {
			res.redirect(301, '/' + version + '/supportingDocumentsUpload/uploadDashboardQ1No');
		}  
	});

	router.post('/' + version + '/supportingDocumentsUpload/uploadDashboard', function(req, res) {
		res.redirect(301, '/' + version + '/supportingDocumentsUpload/uploadDashboard1');
	});

	router.post('/' + version + '/supportingDocumentsUpload/uploadDashboard1', function(req, res) {
		res.redirect(301, '/' + version + '/checkAndSubmit/checkYourAnswersSupportingDocuments');
	});

	router.post('/' + version + '/supportingDocumentsUpload/uploadDashboard2', function(req, res) {
		res.redirect(301, '/' + version + '/checkAndSubmit/checkYourAnswersSupportingDocuments');
	});

	router.post('/' + version + '/supportingDocumentsUpload/uploadDashboard3', function(req, res) {
		res.redirect(301, '/' + version + '/checkAndSubmit/checkYourAnswersSupportingDocuments');
	});	

	router.post('/' + version + '/supportingDocumentsUpload/deleteA', function(req, res) {
		res.redirect(301, '/' + version + '/supportingDocumentsUpload/uploadDashboard');
	});

	router.post('/' + version + '/supportingDocumentsUpload/deleteB', function(req, res) {
		res.redirect(301, '/' + version + '/supportingDocumentsUpload/uploadDashboard3');
	});

	router.post('/' + version + '/supportingDocumentsUpload/deleteC', function(req, res) {
		res.redirect(301, '/' + version + '/supportingDocumentsUpload/uploadDashboard1');
	});

	router.post('/' + version + '/supportingDocumentsUpload/deleteD', function(req, res) {
		res.redirect(301, '/' + version + '/supportingDocumentsUpload/uploadDashboard');
	});


};