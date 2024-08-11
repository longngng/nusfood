const express = require('express');
const connectDB = require('./config/db');

require('dotenv').config();

//Connect database
connectDB();

const app = express();

app.use(express.json({ extended: false }));

app.get('/api/health-check', (req, res) => {
  res.send('Server is running!');
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
