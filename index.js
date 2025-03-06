// const express = require('express');
// const dotenv = require('dotenv');
// const { config } = require('process');

// dotenv.config();

// const app = express();
// app.use(express.json());

// //Routes

// //Handle
// app.use((req, res) => {
//     res.status(404).json({ error: 'Route not found' });
//   });

//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });


const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/authRoutes'));
app.use('/image', require('./routes/imageRoutes'));

app.listen(5000, () => console.log("Server running on port 5000"));
