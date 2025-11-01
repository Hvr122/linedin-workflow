require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');  // ← Comment this out
const linkedinRoutes = require('./routes/linkedin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection - COMMENTED OUT
/*
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));
*/

// Routes
app.use('/api/linkedin', linkedinRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
