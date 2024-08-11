const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

//Connect database
connectDB();

const app = express();

app.use(express.json({ extended: false }));

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your allowed origin(s)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (cookies, Authorization headers, etc.)
};

app.use(cors(corsOptions));

app.get('/api/health-check', (req, res) => {
  res.send('Server is running!');
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/canteens', require('./routes/api/canteens'));
app.use('/api/reviews', require('./routes/api/reviews'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
