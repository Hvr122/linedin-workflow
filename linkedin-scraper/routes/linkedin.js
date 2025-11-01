const express = require('express');
const router = express.Router();
const unipileClient = require('../utils/unipileClient');
const Company = require('../models/Company');

// Test endpoint - List connected accounts
router.get('/accounts', async (req, res) => {
  try {
    const accounts = await unipileClient.listAccounts();
    res.json({
      success: true,
      data: accounts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Search companies
router.post('/search/companies', async (req, res) => {
  try {
    const { accountId, searchUrl } = req.body;
    
    if (!accountId || !searchUrl) {
      return res.status(400).json({
        success: false,
        error: 'accountId and searchUrl are required'
      });
    }

    const results = await unipileClient.searchCompanies(accountId, searchUrl);
    
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Search people/candidates
router.post('/search/people', async (req, res) => {
  try {
    const { accountId, searchUrl } = req.body;
    
    if (!accountId || !searchUrl) {
      return res.status(400).json({
        success: false,
        error: 'accountId and searchUrl are required'
      });
    }

    const results = await unipileClient.searchPeople(accountId, searchUrl);
    
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get company profile and save to MongoDB
router.get('/company/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    const { accountId } = req.query;
    
    if (!accountId) {
      return res.status(400).json({
        success: false,
        error: 'accountId query parameter is required'
      });
    }

    const companyData = await unipileClient.getCompanyProfile(accountId, identifier);
    
    // Save to MongoDB
    const company = await Company.findOneAndUpdate(
      { companyId: identifier },
      {
        companyId: identifier,
        name: companyData.name,
        industry: companyData.industry,
        location: companyData.location,
        description: companyData.description,
        website: companyData.website,
        employeeCount: companyData.employeeCount,
        foundedYear: companyData.foundedYear,
        logo: companyData.logo,
        scrapedAt: new Date()
      },
      { upsert: true, new: true }
    );
    
    res.json({
      success: true,
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
