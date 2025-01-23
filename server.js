const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;
const saltRounds = 10;

// PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',   // Replace with your actual PostgreSQL username
    host: 'localhost',       // Make sure you're connecting to the local PostgreSQL server
    database: 'login_system', // Make sure the database name is correct
    password: 'Ganapati@1406', // Ensure the password is correct
    port: 5432,           
        // Default PostgreSQL port
});

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log('Connection error:', err.stack);
    } else {
        console.log('Connected to the database:', res.rows[0]);
    }
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML, CSS, JS)
app.use(express.static('public'));

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        // Query the database to find the user by username
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            
            // Compare the hashed password from the database with the input password
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                return res.status(200).send('Login successful');
            } else {
                return res.status(401).send('Invalid username or password');
            }
        } else {
            return res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user into the database
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );

        res.status(201).send(`User registered: ${result.rows[0].username}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
