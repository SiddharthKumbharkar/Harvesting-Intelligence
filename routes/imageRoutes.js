const express = require('express');
const { uploadImage } = require('../controllers/imageController');
const { authenticateUser } = require('../middleware/authMiddleware');
//const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');


router.post('/upload', authenticateUser, upload.single('image'), uploadImage);

module.exports = router;
