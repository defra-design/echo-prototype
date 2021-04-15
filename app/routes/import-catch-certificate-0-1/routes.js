module.exports = function(router) {

// Add your routes here - above the module.exports line

// redirect route to start page
router.get('/import-catch-certificate-0-1', (req, res, next) => {
	res.redirect('your-applications')
})

// set the service name on all pages in this version
router.all('*', function (req, res, next) {
	res.locals['serviceName'] = 'Export health certificates'

	next()
})





router.get('/task-list', (req, res, next) => {
	delete req.session.data['filter']
	
	res.render(`${req.version}/task-list`)
})

router.post('/import-catch-certificate-0-1/certificate-number', (req, res, next) => {
	if(req.session.data['import-certificate'] == 'yes'){
		res.redirect('certificate-details')
	} else {
		res.redirect('exports-application--empty')
	}
})

router.post('/import-catch-certificate-0-1/certificate-details', (req, res, next) => {
	res.redirect('exports-application--partial')
})

router.post('/import-catch-certificate-0-1/your-applications', (req, res, next) => {
	res.redirect('choose-certificate')
})

router.post('/import-catch-certificate-0-1/choose-certificate', (req, res, next) => {
	res.redirect('block')
})

router.post('/import-catch-certificate-0-1/clone', (req, res, next) => {
	res.redirect('reuse-reference')
})

router.post('/import-catch-certificate-0-1/reuse-reference', (req, res, next) => {
	res.redirect('review-your-answers')
})

router.post('/import-catch-certificate-0-1/block', (req, res, next) => {
	res.redirect('certificate-number')
})

router.post('/import-catch-certificate-0-1/what-are-you-exporting', (req, res, next) => {
	res.redirect('reference')
})

router.post('/import-catch-certificate-0-1/reference', (req, res, next) => {
	res.redirect('destination')
})

router.post('/import-catch-certificate-0-1/destination', (req, res, next) => {
	res.redirect('about-your-certifier')
})


}