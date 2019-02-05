module.exports = function(router) {
    
	// CHANGE ME TO THE VERSION YOU'RE WORKING ON
	var version = "1-0-0";
	
	router.post('/' + version + '/dashboard', function(req, res) {
		res.redirect(301, '/' + version + '/manualUpload/uploadDashboard');
	});

};