This README is tailored specifically to your Salesforce CRM automation project, focusing on the Lead-to-Opportunity conversion flow and the technical architecture we've finalized.

Salesforce CRM Test Automation
A robust, End-to-End (E2E) automation suite built with Playwright and TypeScript to validate critical Salesforce business flows. This project utilizes the Page Object Model (POM) and advanced network interception to handle the complexities of the Salesforce Lightning Experience (LWC).

🚀 Key Features
Session Persistence: Utilizes storageState to bypass repetitive login flows and maintain authenticated sessions.

Dynamic Lead Management: Implements smart logic to scan, sort, and pick unconverted leads dynamically from the CRM grid.

API Interception: Validates backend data integrity by intercepting XHR/POST requests during lead conversion to verify record creation at the database level.

Shadow DOM Resilience: Employs advanced locators and JavaScript-level execution (evaluate) to reliably interact with Salesforce's deeply nested Lightning Web Components.

Deep Field Validation: Automates record verification by scrolling into dynamic sections (like Stage History) to validate lazy-loaded data such as "Amount" and "Owner."

🛠️ Tech Stack
Framework: Playwright

Language: TypeScript

Architecture: Page Object Model (POM)

Browsers: Chromium, Webkit

📁 Project Structure
Plaintext

├── src/
│   ├── tests/               # E2E Test Specs (e.g., conversionLead.spec.ts)
│   ├── pages/               # Page Object logic (LeadPage, ConvertLeadPage)
│   ├── locators/            # Centralized locator constants
│   └── config/              # Environment and global configurations
├── test-results/            # Screenshots and videos for failed runs
└── playwright.config.ts     # Framework configuration
⚙️ Setup & Execution
Install Dependencies:

Bash

npm install
Run Conversion Tests:

Bash

npx playwright test tests/conversionLead.spec.ts --headed --workers=1
Run Lead E2E Tests:

Bash

npx playwright test tests/lead.spec.ts --headed
📝 Automation Best Practices Used
Polling Clicks: Implemented retry logic for Salesforce path updates to ensure UI transitions are captured.

Decoupled Locators: Strictly separated UI selectors from page logic for easier maintenance.

Network Assertions: Uses waitForResponse to confirm Opportunity ID generation directly from the Salesforce backend API.

Stability Buffers: Incorporates scrollIntoView and hydration timeouts to wait for LWC components to finish rendering.