module.exports = function(router) {
    
	// CHANGE ME TO THE VERSION YOU'RE WORKING ON
	var version = "1-0-0";
	
	router.post('/' + version + '/manualUpload/uploadDashboardQ1', function(req, res) {
		if (req.body.uploadSupportingDocuments === "Yes") {
			res.redirect(301, '/' + version + '/manualUpload/uploadDashboard');
		}
		else if (req.body.uploadSupportingDocuments === "No") {
			res.redirect(301, '/' + version + '/checkAndSubmit/checkYourAnswers');
		}
		// If nothing selected force the user to stay on the page and enter a value to continue
		else {
			res.redirect(301, '/' + version + '/manualUpload/uploadDashboardQ1');
		}  
	});

	router.post('/' + version + '/manualUpload/uploadDashboard', function(req, res) {
		res.redirect(301, '/' + version + '/manualUpload/uploadDashboard1');
	});

	router.post('/' + version + '/manualUpload/uploadDashboard1', function(req, res) {
		res.redirect(301, '/' + version + '/checkAndSubmit/checkYourAnswers');
	});

	router.post('/' + version + '/manualUpload/uploadDashboard2', function(req, res) {
		res.redirect(301, '/' + version + '/checkAndSubmit/checkYourAnswers');
	});

	router.post('/' + version + '/manualUpload/uploadDashboard3', function(req, res) {
		res.redirect(301, '/' + version + '/checkAndSubmit/checkYourAnswers');
	});	

	router.post('/' + version + '/manualUpload/deleteA', function(req, res) {
		res.redirect(301, '/' + version + '/manualUpload/uploadDashboard');
	});

	router.post('/' + version + '/manualUpload/deleteB', function(req, res) {
		res.redirect(301, '/' + version + '/manualUpload/uploadDashboard3');
	});

	router.post('/' + version + '/manualUpload/deleteC', function(req, res) {
		res.redirect(301, '/' + version + '/manualUpload/uploadDashboard1');
	});

	router.post('/' + version + '/manualUpload/deleteD', function(req, res) {
		res.redirect(301, '/' + version + '/manualUpload/uploadDashboard');
	});


};