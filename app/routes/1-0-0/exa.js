module.exports = function(router) {
    
	// CHANGE ME TO THE VERSION YOU'RE WORKING ON
	var version = "1-0-0";
	
	router.post('/' + version + '/exa/q1', function(req, res) {
		res.redirect(301, '/' + version + '/exa/q2');
	});

	router.post('/' + version + '/exa/q2', function(req, res) {
		res.redirect(301, '/' + version + '/exa/q3');
	});

	router.post('/' + version + '/exa/q3', function(req, res) {
		res.redirect(301, '/' + version + '/manualUpload/uploadDashboardQ1');
	});

};