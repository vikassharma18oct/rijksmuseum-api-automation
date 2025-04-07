const { test, expect } = require('@playwright/test');
const {
  API_KEY,
  BASE_ENDPOINT,
  VALID_OBJECT_ID,
  INVALID_OBJECT_ID,
  ARTIST_NAME,
} = require('./utils/rijksmuseumTestData');
const { sendRequest } = require('./utils/apiHelper');

test.describe('Rijksmuseum Collection & Object Details API Tests', () => {

  test('TC01: Retrieve default collections', async ({ request }) => {
    const { response, body } = await sendRequest(request, `${BASE_ENDPOINT}?key=${API_KEY}`);
    
    expect(response.status()).toBe(200);
    expect(Array.isArray(body.artObjects)).toBeTruthy();
    expect(body.artObjects.length).toBeGreaterThan(0);
  });

  test('TC02: Retrieve collections with involvedMaker filter (Rembrandt van Rijn)', async ({ request }) => {
    const { response, body } = await sendRequest(request, `${BASE_ENDPOINT}?key=${API_KEY}&involvedMaker=${ARTIST_NAME}`);
    
    expect(response.status()).toBe(200);
    expect(body.artObjects.length).toBeGreaterThan(0);
    expect(body.artObjects.some(obj => obj.principalOrFirstMaker.includes("Rembrandt"))).toBeTruthy();
  });

  test('TC03: Retrieve object details with valid ID', async ({ request }) => {
    const { response, body } = await sendRequest(request, `${BASE_ENDPOINT}/${VALID_OBJECT_ID}?key=${API_KEY}`);
    
    expect(response.status()).toBe(200);
    expect(body.artObject.objectNumber).toBe(VALID_OBJECT_ID);
    expect(body.artObject.title).toBe("De Nachtwacht");
  });

  test('TC04: Retrieve object details with invalid ID returns nulls, not 404', async ({ request }) => {
    const { response, body } = await sendRequest(request, `${BASE_ENDPOINT}/${INVALID_OBJECT_ID}?key=${API_KEY}`);
    
    expect(response.status()).toBe(200); // API still returns 200
    expect(body.artObject).toBeNull();
    expect(body.artObjectPage).toBeNull();
  });

  test('TC05: Unauthorized request with invalid API key', async ({ request }) => {
    const { response } = await sendRequest(request, `${BASE_ENDPOINT}?key=invalidkey`);
    
    expect(response.status()).toBe(401);
  });

  test('TC06: Validate response schema of a valid object detail', async ({ request }) => {
    const { response, body } = await sendRequest(request, `${BASE_ENDPOINT}/${VALID_OBJECT_ID}?key=${API_KEY}`);
    
    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('artObject');
    expect(body.artObject).toHaveProperty('objectNumber');
    expect(body.artObject).toHaveProperty('title');
    expect(body.artObject).toHaveProperty('principalOrFirstMaker');
    expect(body.artObject).toHaveProperty('hasImage');
  });

  test('TC07: Check response time under 3000ms for default collection query', async ({ request }) => {
    const start = Date.now();
    const { response, body } = await sendRequest(request, `${BASE_ENDPOINT}/${VALID_OBJECT_ID}?key=${API_KEY}`);
    const duration = Date.now() - start;
  
    expect(response.status()).toBe(200);
  
    // Main threshold check
    expect(duration).toBeLessThan(3000);
  
    // Optional SLA warning (not a failing condition)
    const SLA_THRESHOLD = 1000;
    if (duration > SLA_THRESHOLD) {
      console.warn(`API responded in ${duration}ms, which exceeds SLA threshold of ${SLA_THRESHOLD}ms`);
    } else {
      console.log(`API response time: ${duration}ms`);
    }
  });

});
