pipeline {
    agent any
    tools { nodejs 'Node-20' }
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
        stage('Run Tests') {
            steps { 
                sh 'npx playwright test --project=chromium || true' 
            }
        }
    }
    post {
        always {
            junit allowEmptyResults: true, testResults: 'test-results/**/*.xml, test-results/junit-results.xml'
            publishHTML([
                allowMissing: true,
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
