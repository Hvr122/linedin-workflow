const axios = require('axios');

class UnipileClient {
  constructor() {
    this.baseURL = process.env.UNIPILE_DSN;
    this.accessToken = process.env.UNIPILE_ACCESS_TOKEN;
    this.headers = {
      'Authorization': `Bearer ${this.accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  // List all connected accounts
  async listAccounts() {
    try {
      const response = await axios.get(`${this.baseURL}/api/v1/accounts`, {
        headers: this.headers
      });
      return response.data;
    } catch (error) {
      console.error('Error listing accounts:', error.response?.data || error.message);
      throw error;
    }
  }

  // Search for companies
  async searchCompanies(accountId, searchUrl) {
    try {
      const response = await axios.post(
        `${this.baseURL}/api/v1/linkedin/search`,
        {
          account_id: accountId,
          url: searchUrl,
          type: 'COMPANY'
        },
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error searching companies:', error.response?.data || error.message);
      throw error;
    }
  }

  // Search for people/candidates
  async searchPeople(accountId, searchUrl) {
    try {
      const response = await axios.post(
        `${this.baseURL}/api/v1/linkedin/search`,
        {
          account_id: accountId,
          url: searchUrl,
          type: 'PEOPLE'
        },
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error searching people:', error.response?.data || error.message);
      throw error;
    }
  }

  // Get company profile
  async getCompanyProfile(accountId, companyIdentifier) {
    try {
      const response = await axios.get(
        `${this.baseURL}/api/v1/linkedin/company/${companyIdentifier}`,
        {
          params: { account_id: accountId },
          headers: this.headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error getting company profile:', error.response?.data || error.message);
      throw error;
    }
  }

  // Get user profile
  async getUserProfile(accountId, userIdentifier) {
    try {
      const response = await axios.get(
        `${this.baseURL}/api/v1/users/${userIdentifier}`,
        {
          params: { account_id: accountId },
          headers: this.headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error getting user profile:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = new UnipileClient();
