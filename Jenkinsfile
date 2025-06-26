pipeline {
  agent any

  tools { nodejs "Node 20" }
  environment {
    FRONTEND_DIR = "frontend"
    BACKEND_DIR  = "backend"
    CI = 'false'
    PM2_HOME = "${WORKSPACE}\\.pm2"
  }

//   triggers {
//     // Trigger build on every push to Git repository via webhook
//     githubPush()
// }

  stages {
    stage('Install PM2 & Serve') {
      steps {
        // Install PM2 and serve globally for stable invocation
        bat 'npm install -g pm2 serve'
      }
    }
    
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
        // Clean PM2 state directory
        bat 'if exist "%PM2_HOME%" rd /s /q "%PM2_HOME%"'

        // Stop existing processes
        bat 'npx pm2 delete mern-backend --silent 2>nul || echo "backend not running" && exit 0'
        bat 'npx pm2 delete mern-frontend --silent 2>nul || echo "frontend not running" && exit 0'
        bat 'icacls "%PM2_HOME%\\logs" /grant "BUILTIN\\Users":(OI)(CI)(F) /T /C /Q'
        // Start backend service
        dir(BACKEND_DIR) {
          bat "npx pm2 start node --name mern-backend --cwd %CD% -- app.js"
        }
         bat "npx pm2 start cmd.exe --name mern-frontend --cwd %CD%\\${FRONTEND_DIR}\\build -- /c serve -s . -l 3000"
   }
     }
    }

  post {
    success { echo '✅ Build & Deploy successful!' }
    failure { echo '❌ Build or Deploy failed, check logs.' }
  }
}
