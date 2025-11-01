const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyId: { type: String, unique: true },
  name: String,
  industry: String,
  location: String,
  description: String,
  website: String,
  employeeCount: Number,
  foundedYear: Number,
  logo: String,
  scrapedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', companySchema);
