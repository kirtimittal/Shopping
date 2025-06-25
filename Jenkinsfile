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
        // Clean local PM2 folder
        bat 'if exist "%PM2_HOME%" rd /s /q "%PM2_HOME%"'
        
        // Delete old processes if they exist
        // bat 'npx pm2 delete mern-backend || echo "backend not running"'
        // bat 'npx pm2 delete mern-frontend || echo "frontend not running"'

        // Start backend process
        bat "npx pm2 start node --name mern-backend -- cwd %CD%\\${BACKEND_DIR} -- script app.js"

        // Serve frontend build
        bat "npx pm2 start npx --name mern-frontend -- cwd %CD%\\${FRONTEND_DIR}\\build -- serve -s . -l 3000"
      }
    }
  }

  post {
    success { echo '✅ Build & Deploy successful!' }
    failure { echo '❌ Build or Deploy failed, check logs.' }
  }
}
