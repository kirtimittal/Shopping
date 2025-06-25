pipeline {
  agent any

  tools { nodejs "Node 20" }
  environment {
    FRONTEND_DIR = "frontend"
    BACKEND_DIR  = "backend"
    CI = 'false'
  }

  stages {
    stage('Install & Build Frontend') {
      steps {
        dir(FRONTEND_DIR) {
          bat 'npm install'
          bat 'npm run build'
        }
      }
    }

    stage('Install Backend') {
      steps {
        dir(BACKEND_DIR) {
          bat 'npm install'
        }
      }
    }

    stage('Deploy with PM2') {
      steps {
        // Stop any old processes
        bat 'pm2 delete mern-backend || echo "backend not running"'
        bat 'pm2 delete mern-frontend || echo "frontend not running"'

        // Start backend (assumes server/index.js listens on 5000)
        bat """pm2 start node --name mern-backend -- cwd %CD%\\${BACKEND_DIR} -- script app.js"""

        // Start frontend build serving
        bat """pm2 start npx --name mern-frontend -- cwd %CD%\\${FRONTEND_DIR}\\build -- serve -s . -l 3000"""
      }
    }
  }

  post {
    success { echo '✅ Build & Deploy successful!' }
    failure { echo '❌ Build or Deploy failed, check logs.' }
  }
}
