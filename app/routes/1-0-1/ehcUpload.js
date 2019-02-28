module.exports = function(router) {
    
	// CHANGE ME TO THE VERSION YOU'RE WORKING ON
	var version = "1-0-0";
	
	router.post('/' + version + '/ehcUpload/ehcUploadDashboard', function(req, res) {
		res.redirect(301, '/' + version + '/ehcUpload/ehcUploadDashboard1');
	});

	router.post('/' + version + '/ehcUpload/ehcUploadDashboard1', function(req, res) {
		res.redirect(301, '/' + version + '/exa/q1');
	});

	router.post('/' + version + '/ehcUpload/deleteA', function(req, res) {
		res.redirect(301, '/' + version + '/ehcUpload/ehcUploadDashboard');
	});

};