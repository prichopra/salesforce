Salesforce CRM Test Automation
This project is a high-performance automation framework designed for Salesforce CRM, specifically focusing on the Lead Conversion Flow using Playwright. It leverages a Page Object Model (POM) architecture to ensure scalability and maintainability, separating business logic from technical locators.

## Key Features
Modular Architecture: Utilizes separate Page Objects and dedicated Locator files to minimize maintenance overhead.

Intelligent Test Data Handling: Includes logic to detect available "Working" leads and gracefully skips tests if no suitable data is found, preventing false failures in CI/CD.

Robust Salesforce Handling: Features custom wait strategies and "strict mode" resolution for complex Salesforce Lightning components like dynamic grids and modals.

Session Persistence: Configured to use storageState.json to bypass repetitive login flows and improve execution speed.

## Project Structure
src/pages/: Contains Page Object classes (e.g., convertLeadPage.ts) defining user actions.

src/pages/locators/: Centralized locator files (e.g., convertLeadLocators.ts) for easy UI updates.

src/tests/: Test specifications (e.g., conversionLead.spec.ts) defining the test scenarios.

src/config/: Environment and global configurations.

## Getting Started
1. Prerequisites
   Node.js (v16 or higher)

Playwright CLI

2. Installation
   Bash

npm install
npx playwright install
3. Generating Session State
   To skip the login process during test runs, generate your session state:

Bash

npx playwright codegen --save-storage=storageState.json <your-salesforce-url>
4. Running Tests
   To run the lead conversion flow in headed mode:

Bash

npx playwright test tests/conversionLead.spec.ts --headed --workers=1
## Recent Fixes & Optimizations
Modal Interception: Updated executeConversion to detect and handle active "Convert Lead" dialogs.

Success Screen Handling: Added support for both "Go to Opportunity" and "Go to Leads" success screens to match different Salesforce Org configurations.

URL Stability: Refined getLeadId to wait for record-specific elements rather than relying solely on asynchronous URL changes.