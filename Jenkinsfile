pipeline {
    agent any
    tools { nodejs 'Node-20' }
    options { timestamps() }
    environment { CI = 'true' }
    stages {
        stage('Checkout') { steps { checkout scm } }
        stage('Clean Reports') {
            steps { sh 'rm -rf playwright-report test-results allure-results' }
        }
        stage('Install Dependencies') {
            steps { sh 'npm ci' }
        }
        stage('Install Browsers') {
            steps { sh 'npx playwright install --with-deps chromium' }
        }
        stage('Run Tests') {
            steps { sh 'npx playwright test' }
        }
    }
    post {
        always {
            junit allowEmptyResults: true, testResults: 'test-results/junit-results.xml'
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
            allure(includeProperties: false, results: [[path: 'allure-results']])
            archiveArtifacts artifacts: 'playwright-report/**/*, test-results/**/*', allowEmptyArchive: true
        }
    }
}
