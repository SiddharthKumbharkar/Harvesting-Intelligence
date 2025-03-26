const { authDB } = require('../config/db'); // Keep database connection
const axios = require('axios'); 
const path = require('path');
const fs = require('fs');

// Image upload handler
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }


        // Optional: Save to database (Uncomment if needed)
        const userId = req.user.userId;
        const filename = req.file.filename;
        
       console.log(`Uploading Image: ${filename} for User ID: ${userId}`); // Debug log
        const result =  await authDB.query('INSERT INTO images (user_id, filename) VALUES ($1, $2)', [userId, filename]);
        console.log(` Image Saved in DB:`, result.rows[0]);
         
        // Check if file exists before sending
        // if (!fs.existsSync(imagePath)) {
        //     console.error("Image file not found:", imagePath);
        //     return res.status(500).json({ error: "Image file not found" });
        // }

        //  // Send the image to AI model
        // const aiResponse = await axios.post("http://127.0.0.1:5000/predict", {
        //     imagePath: `uploads/${filename}`
        // });
        // Send the image to AI model

        //uncomment this when model integrated
        // const formData = new FormData();
        // formData.append("image", fs.createReadStream(imagePath));

        // const aiResponse = await axios.post("http://127.0.0.1:5000/predict", formData, {
        //     headers: { 
        //         ...formData.getHeaders(),
        //     }
        // });

        // console.log(`🟢 AI Response:`, aiResponse.data);

        // res.json({ message: 'File uploaded successfully', filename, disease: aiResponse.data.disease});
        res.json({ message: 'File uploaded successfully', filename});
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { uploadImage };
