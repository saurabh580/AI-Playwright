# AI-Playwright
AI-Playwright - E2E Automation Framework with CI/CD
Enterprise-grade Playwright + TypeScript framework with AI-powered testing, Jenkins CI/CD, and professional reporting. Built to showcase SDET skills for FAANG/Top Product companies.

[Jenkins](http://localhost:8080/job/AI-Playwright-CI/)
[Playwright](https://playwright.dev)
[TypeScript](https://www.typescriptlang.org/)

🎯 Live CI/CD Dashboard
Jenkins: http://localhost:8080/job/AI-Playwright-CI/
HTML Report: Jenkins > Playwright HTML Report
Allure Report: Jenkins > Allure Report
Test Trends: Jenkins > Test Result Trend
🚀 What This Repo Demonstrates (For Recruiters)
1. Framework Design

Page Object Model (POM) - pages/LoginPage.ts
Data-driven testing with fixtures
Self-healing locators & AI resilience patterns
2. Test Coverage

UI Tests: Login, Search, Add to Cart, E2E Checkout (@smoke @regression @e2e)
API Tests: api-products.spec.ts - Products, Brands, Search APIs
Visual Tests: Screenshot comparison baselines
Accessibility: Alt text, labels, ARIA checks
Performance: Page load time assertions
3. CI/CD Integration

Jenkinsfile with declarative pipeline
Parallel execution, retries, artifact archiving
JUnit + HTML Publisher + Allure reporting
GitHub Webhook auto-trigger on push
NodeJS Tool + Git Tool configuration
4. Best Practices

.env for secrets, .gitignore for reports
testDir: './tests', outputDir: 'test-results/'
Trace on retry, Screenshot on failure, Video retain on failure
Tags: @smoke @regression @api @e2e @critical
📁 Project Structure
AI-Playwright/
├── pages/
│   └── LoginPage.ts          # POM
├── tests/
│   ├── login-success.spec.ts # POM + Data-driven
│   ├── search-tshirts.spec.ts
│   ├── add-to-cart.spec.ts
│   ├── e2e-checkout.spec.ts
│   ├── api-products.spec.ts  # API testing
│   └── ai-visual-accessibility.spec.ts
├── testcontexts/             # AI contexts / auth states
├── playwright.config.ts      # Jenkins-optimized config
├── Jenkinsfile               # Declarative pipeline
└── .env.example
🛠️ Run Locally
npm ci
npx playwright install --with-deps chromium
npx playwright test --project=chromium
npx playwright show-report
🏗️ Run on Jenkins
git push origin main # Auto-triggers Jenkins via webhook
# Or manual: Jenkins > AI-Playwright-CI > Build Now
📊 Reporting
HTML: npx playwright show-report
Allure: allure serve allure-results
JUnit: test-results/junit-results.xml -> Jenkins Trend
👨‍💻 Author
Saurabh Gaur - SDET | Playwright | TypeScript | Jenkins | AI Testing

GitHub: github.com/saurabh580
Location: Bangalore, India
Open to: SDET, QA Automation, Test Architect roles
Built with ❤️ to demonstrate production-grade test automation for top tech companies.

