const { authDB } = require('../config/db'); // Keep database connection

// Image upload handler
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Optional: Save to database (Uncomment if needed)
        const userId = req.user.userId;
         await authDB.query('INSERT INTO images (user_id, filename) VALUES ($1, $2)', [userId, req.file.filename]);

        res.json({ message: 'File uploaded successfully', filename: req.file.filename });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { uploadImage };
