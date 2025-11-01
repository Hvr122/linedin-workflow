const express = require('express');
const router = express.Router();
const unipileClient = require('../utils/unipileClient');
// const Company = require('../models/Company');  // ← Comment this out

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

// Search companies (just return data, don't save)
router.post('/search/companies', async (req, res) => {
  try {
    const { searchUrl, accountId } = req.body;
     console.log('Received:', { searchUrl, accountId });
    if (!searchUrl) {
      return res.status(400).json({
        success: false,
        error: 'searchUrl is required'
      });
    }

    const results = await unipileClient.searchCompanies(searchUrl, accountId);
    
    // Just return the data
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Full error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.response?.data  // ← Shows full error from Unipile
    });
  }
});

// Search people
router.post('/search/people', async (req, res) => {
  try {
    const { searchUrl, accountId } = req.query;
    
    if (!searchUrl) {
      return res.status(400).json({
        success: false,
        error: 'searchUrl is required'
      });
    }

    const results = await unipileClient.searchPeople(searchUrl, accountId);
    
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

// Get company profile (no MongoDB save)
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
    
    // Just return the data directly
    res.json({
      success: true,
      data: companyData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
// Get company posts
router.get('/company/:organizationId/posts', async (req, res) => {
  try {
    const { organizationId } = req.params;
    const { accountId, limit } = req.query;
    
    console.log('Getting posts for company:', organizationId);
    
    if (!accountId) {
      return res.status(400).json({
        success: false,
        error: 'accountId query parameter is required'
      });
    }

    const posts = await unipileClient.getCompanyPosts(
      organizationId, 
      accountId, 
      limit || 10
    );
    
    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error('Full error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.response?.data
    });
  }
});

module.exports = router;
