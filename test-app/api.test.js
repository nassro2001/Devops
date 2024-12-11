const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;

const baseURL = 'http://web-container:8080/api';

// Retry helper
const retry = async (fn, retries = 5, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i < retries - 1) {
        console.log(`Retrying... (${i + 1}/${retries})`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        throw error;
      }
    }
  }
};

describe('API Tests', function () {
  this.timeout(15000); // Set global timeout for all tests

  before(async function () {
    console.log('Waiting for backend to initialize...');
    await new Promise(resolve => setTimeout(resolve, 5000)); // Add delay before tests
  });

  it('should create a new tutorial', async function () {
    const data = {
      title: 'test test12 tutorial',
      description: 'this is the description of the first tutorial',
      published: false
    };

    const response = await retry(() => axios.post(`${baseURL}/tutorials`, data));
    expect(response.status).to.equal(201);
    console.log(response.data);
  });

  it('should retrieve tutorials as a JSON array', async function () {
    const response = await retry(() => axios.get(`${baseURL}/tutorials`));
    expect(response.status).to.equal(200);
    expect(response.headers['content-type']).to.include('application/json');
    expect(response.data).to.be.an('array');
  });
});
