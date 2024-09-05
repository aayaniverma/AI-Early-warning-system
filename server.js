const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Endpoint to register users
app.post('/register', async (req, res) => {
  const { phone, countryCode, location } = req.body;

  try {
    const user = new User({ phone, countryCode, location });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Endpoint to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Endpoint to send alert
app.post('/sendAlert', async (req, res) => {
  const { location, alert } = req.body;

  try {
    const users = await User.find({ location });
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found for this location' });
    }
    // Logic to send alerts to users
    res.status(200).json({ message: 'Alerts sent successfully' });
  } catch (error) {
    console.error('Error sending alert:', error);
    res.status(500).json({ message: 'Failed to send alert' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
