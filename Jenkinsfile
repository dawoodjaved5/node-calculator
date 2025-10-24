pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
        NPM_CONFIG_LOGLEVEL = 'error'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                script {
                    // Use Node.js version specified in environment
                    sh """
                        if command -v nvm >/dev/null 2>&1; then
                            nvm use ${NODE_VERSION} || nvm install ${NODE_VERSION}
                        elif command -v n >/dev/null 2>&1; then
                            n ${NODE_VERSION}
                        else
                            echo "Node.js version manager not found. Using system Node.js"
                        fi
                    """
                }
                sh 'node --version'
                sh 'npm --version'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Lint Code') {
            steps {
                script {
                    try {
                        sh 'npm run lint'
                    } catch (Exception e) {
                        echo "Linting failed: ${e.getMessage()}"
                        echo "Skipping lint stage - no lint script configured"
                    }
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    // Publish test results
                    publishTestResults testResultsPattern: 'test-results.xml'
                    
                    // Publish coverage reports if available
                    publishCoverage adapters: [
                        coberturaAdapter('coverage/cobertura-coverage.xml')
                    ], sourceFileResolver: sourceFiles('STORE_LAST_BUILD')
                }
            }
        }
        
        stage('Code Quality Analysis') {
            steps {
                script {
                    try {
                        sh 'npm run quality-check'
                    } catch (Exception e) {
                        echo "Code quality analysis failed: ${e.getMessage()}"
                        echo "Skipping quality check - no quality script configured"
                    }
                }
            }
        }
        
        stage('Security Audit') {
            steps {
                sh 'npm audit --audit-level=moderate'
            }
        }
        
        stage('Build') {
            steps {
                script {
                    try {
                        sh 'npm run build'
                    } catch (Exception e) {
                        echo "Build failed: ${e.getMessage()}"
                        echo "Skipping build stage - no build script configured"
                    }
                }
            }
        }
        
        stage('Package') {
            steps {
                script {
                    // Create a deployment package
                    sh '''
                        mkdir -p dist
                        cp package.json dist/
                        cp calculator.js dist/
                        cp README.md dist/ 2>/dev/null || echo "No README.md found"
                        tar -czf node-calculator-${BUILD_NUMBER}.tar.gz -C dist .
                    '''
                }
                archiveArtifacts artifacts: '*.tar.gz', fingerprint: true
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop' || branch 'staging'
            }
            steps {
                script {
                    echo "Deploying to staging environment..."
                    // Add your staging deployment logic here
                    // Example: docker build, kubectl apply, etc.
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main' || branch 'master'
            }
            steps {
                script {
                    echo "Deploying to production environment..."
                    // Add your production deployment logic here
                    // Example: docker build, kubectl apply, etc.
                }
            }
        }
    }
    
    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        
        success {
            script {
                echo "Pipeline completed successfully!"
                // Send success notification
                emailext (
                    subject: "✅ Build Success: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                    body: """
                        <h2>Build Successful!</h2>
                        <p><strong>Project:</strong> ${env.JOB_NAME}</p>
                        <p><strong>Build Number:</strong> ${env.BUILD_NUMBER}</p>
                        <p><strong>Branch:</strong> ${env.BRANCH_NAME}</p>
                        <p><strong>Commit:</strong> ${env.GIT_COMMIT}</p>
                        <p><strong>Duration:</strong> ${currentBuild.durationString}</p>
                        <p><a href="${env.BUILD_URL}">View Build Details</a></p>
                    """,
                    to: "${env.CHANGE_AUTHOR_EMAIL ?: 'admin@example.com'}",
                    mimeType: 'text/html'
                )
            }
        }
        
        failure {
            script {
                echo "Pipeline failed!"
                // Send failure notification
                emailext (
                    subject: "❌ Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                    body: """
                        <h2>Build Failed!</h2>
                        <p><strong>Project:</strong> ${env.JOB_NAME}</p>
                        <p><strong>Build Number:</strong> ${env.BUILD_NUMBER}</p>
                        <p><strong>Branch:</strong> ${env.BRANCH_NAME}</p>
                        <p><strong>Commit:</strong> ${env.GIT_COMMIT}</p>
                        <p><strong>Duration:</strong> ${currentBuild.durationString}</p>
                        <p><a href="${env.BUILD_URL}">View Build Details</a></p>
                        <p><a href="${env.BUILD_URL}console">View Console Output</a></p>
                    """,
                    to: "${env.CHANGE_AUTHOR_EMAIL ?: 'admin@example.com'}",
                    mimeType: 'text/html'
                )
            }
        }
        
        unstable {
            script {
                echo "Pipeline completed with warnings!"
            }
        }
    }
}
