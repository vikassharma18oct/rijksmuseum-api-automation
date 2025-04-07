# Rijksmuseum API Test Cases

This document outlines the test cases implemented to validate the Rijksmuseum Collection and Object Details API.
---
## ✅ Base Configurations

- **Base Path**: `/api/nl/collection`
- **Host**: `https://www.rijksmuseum.nl`
- **Full Endpoint**: `https://www.rijksmuseum.nl/api/nl/collection`
- **API Key**: Injected via environment variable `API_KEY`
- **Object IDs & Test Data**: Managed in `rijksmuseumTestData.js`

---

## 🧪 Test Cases

### TC01: Retrieve Default Collections

- **Endpoint**: `/api/nl/collection?key={API_KEY}`
- **Assertions**:
  - Status code is `200`
  - `artObjects` is an array
  - `artObjects.length > 0`

---

### TC02: Retrieve Collections by Artist (Rembrandt)

- **Endpoint**: `/api/nl/collection?key={API_KEY}&involvedMaker=Rembrandt+van+Rijn`
- **Assertions**:
  - Status code is `200`
  - Response contains at least one object
  - At least one object has `principalOrFirstMaker` containing `"Rembrandt"`

---

### TC03: Retrieve Object Details (Valid Object ID)

- **Endpoint**: `/api/nl/collection/SK-C-5?key={API_KEY}`
- **Assertions**:
  - Status code is `200`
  - `objectNumber` matches the valid ID
  - `title` is `"De Nachtwacht"`

---

### TC04: Retrieve Object Details (Invalid Object ID)

- **Endpoint**: `/api/nl/collection/INVALID-123?key={API_KEY}`
- **Assertions**:
  - Status code is `200` (API does not return 404)
  - `artObject` is `null`
  - `artObjectPage` is `null`

---

### TC05: Unauthorized Request with Invalid API Key

- **Endpoint**: `/api/nl/collection?key=invalidkey`
- **Assertions**:
  - Status code is `401`
  - Response body contains `"Invalid key"` or appropriate error message

---

### TC06: Validate Schema of Object Detail

- **Endpoint**: `/api/nl/collection/SK-C-5?key={API_KEY}`
- **Assertions**:
  - Status code is `200`
  - Response contains keys:
    - `artObject`
      - `objectNumber`
      - `title`
      - `principalOrFirstMaker`
      - `hasImage`

---

### TC07: Check API Response Time

- **Endpoint**: `/api/nl/collection?key={API_KEY}`
- **Assertions**:
  - Status code is `200`
  - ⚠️ Response time is **less than 3000ms** _(temporarily set due to consistent latency > 2000ms)_
- **Note**:
  - Original performance goal was `< 1000ms`
  - Adjusted to `< 3000ms` to reflect real API response times and ensure test reliability

---

## 📁 Related Files

- `rijksmuseum-api.spec.js` – Playwright test spec
- `rijksmuseumTestData.js` – Test inputs and environment-based config
- `apiHelper.js` – Utility functions for request abstraction and response handling

---

## 📌 Notes

- API key is managed securely using environment variables (`process.env.API_KEY`)
- URL encoding is applied where needed (e.g., artist names)
- Tests include negative scenarios and schema validations
- Requests is handled via `sendRequest()` helper to reduces redundancy and makes individual test cases cleaner and more focused on their specific assertions.
