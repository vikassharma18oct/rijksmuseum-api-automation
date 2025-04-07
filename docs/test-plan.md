# Test Plan – Rijksmuseum API Testing

## 📌 Objective

The goal is to validate the Rijksmuseum Collection and Object Details API to ensure it meets expected functionality, performance, and error-handling standards. This includes verifying collections retrieval, filtering by artist, object details, authorization, and response structure.

---

## ✅ Scope

### In Scope
- Rijksmuseum public API endpoints for:
  - Collection retrieval
  - Object details
  - Artist filtering
- Functional validation
- Negative testing (invalid ID, unauthorized key)
- Response schema checks
- Response time validation

### Out of Scope
- UI testing
- API rate limit/load testing

---

## 🔧 Tools & Tech Stack

| Area                 | Tool / Approach                  |
|----------------------|----------------------------------|
| Test Runner          | Playwright Test                  |
| Language             | JavaScript (Node.js)             |
| Reporting (optional) | HTML / Console                   |
| CI/CD (optional)     | GitHub Actions                   |
| Data Management      | `rijksmuseumTestData.js`         |
| Reusability          | Helper: `apiHelper.js`           |

---

## 🔍 Test Types Covered

- ✅ Functional API Testing
- ✅ Negative/Boundary Testing
- ✅ Schema Validation
- ✅ Performance (response time check)

---

## 🧪 Test Execution Strategy

- Tests are defined in `rijksmuseum-api.spec.js`
- Reusable utilities live in `apiHelper.js`
- Test data and constants are stored in `rijksmuseumTestData.js`
- Tests can be run via `npx playwright test`

---

## 🌐 Test Environments

- **Target Environment**: Rijksmuseum public API (https://www.rijksmuseum.nl/api/)
- No staging or internal environment is required

---

## 👥 Team & Responsibilities

| Role              | Name            | Responsibility              |
|-------------------|------------------|------------------------------|
| QA Lead           | Vikas Sharma     | Test planning, execution, reporting |


---

## 📄 Deliverables

- `test-plan.md` – this document
- `test-cases.md` – detailed test scenarios
- `rijksmuseum-api.spec.js` – implementation of tests
-  HTML test results report 

---

## 📝 Assumptions

- The API remains publicly available and stable during test execution
- Valid API key is available


---

## ❗ Risks & Mitigations

| Risk                                  | Mitigation                           |
|---------------------------------------|--------------------------------------|
| API becomes unavailable               | Update the logic API                 |
| API response format changes           | Update schema assertions accordingly |
| Rate limits / throttling              | Add delay or limit test frequency    |


