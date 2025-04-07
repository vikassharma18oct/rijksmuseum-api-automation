# Rijksmuseum API Testing with Playwright

This project utilizes Playwright to validate the Rijksmuseum's public API by testing endpoints that fetch collections and object details.

## ✅ Tech Stack

- **Playwright (JavaScript)**: For aPI testing.
- **Node.js**: JavaScript runtime environment.
- **GitHub Actions**: For Continuous Integration/Continuous Deployment (CI/CD).

## 📦 Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/vikassharma18oct/rijksmuseum-api-automation.git

   ```

2. **Install Dependencies**:

```bash
npm install

```

3. **Set Environment Variables**:

- Ensure the API_KEY environment variable is set with your Rijksmuseum API key (API_KEY=your_api_key_here)

## 🚀 Running Tests

Execute Tests:

- npx playwright test

View Test Report:
-npx playwright show-report

## 🧪 CI/CD Integration

Tests are automatically executed via GitHub Actions on each push to the main branch. Test reports are uploaded as artifacts for review.

## 📁 Project Structure

├── tests/
│ ├── rijksmuseum-api.spec.js # Playwright test specifications
│
├── utils/
│ ├── apiHelper.js # Helper functions for API requests
│
├── testData/
│ ├── rijksmuseumTestData.js # Test data and constants
│
├── docs/
│ ├── test-plan.md # Detailed test plan
│ ├── test-cases.md # Specific test cases
│
├── .github/workflows/
│ ├── playwright-ci.yml # GitHub Actions workflow configuration
│
├── test-results/ # Directory for test results
├── README.md # Project overview and instructions

## 📄 Documentation

- Test Plan: Refer to docs/test-plan.md for the comprehensive test plan outlining the testing strategy and scope.
- Test Cases: Detailed test cases are documented in docs/test-cases.md.

## 🔗 References

- Rijksmuseum API Documentation: https://data.rijksmuseum.nl/object-metadata/api/
