pipeline {
    agent any
    tools { nodejs 'Node-20' }
    triggers { cron('H 9 * * 1') } // Monday 9AM weekly
    options { timestamps() }
    environment { CI = 'true' }
    stages {
        stage('Clean') {
            steps { sh 'rm -rf playwright-report test-results allure-results' }
        }
        stage('Install') {
            steps { 
                sh 'npm ci'
                sh 'npx playwright install --with-deps chromium'
            }
        }
        stage('Run Tests - Chromium Only') {
            steps { sh 'npx playwright test --project=chromium' }
        }
    }
    post {
        always {
            junit allowEmptyResults: true, testResults: 'test-results/junit-results.xml'
            publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright HTML Report'])
            allure(includeProperties: false, jdk: '', commandline: 'Allure', results: [[path: 'allure-results']])
        }
    }
}
