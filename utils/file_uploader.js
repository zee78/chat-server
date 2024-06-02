

function uploadMiddleware(req, uploadSetting) {
	req.savedPic = [];  // multer will push saved images in this array attached with req
	return new Promise((resolve) => {
		uploadSetting(req, null, async (err) => {
			if (err) {
				return new Error('Failed to upload image/s')
			}
			else {
				resolve(req.savedPic);
			}
		})
	})
}

module.exports = {
	uploadMiddleware
}
