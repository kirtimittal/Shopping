pipeline {
  agent any

  tools { nodejs "Node 20" }
  environment {
    FRONTEND_DIR = "frontend"
    BACKEND_DIR  = "backend"
    CI = 'false'
    PM2_HOME = "${WORKSPACE}\\.pm2"
  }

  stages {
    stage('Install PM2') {
      steps {
        bat 'npm install -g pm2'
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
    //  stage('Serve Frontend') {
    //   steps {
    //     dir(FRONTEND_DIR) {
    //       // Launch serve in background
    //       bat 'start "Front" /B cmd /c "npx serve -s build -l 3002"'
    //     }
    //   }
    // }
    // stage('Start Backend') {
    //   steps {
    //     dir(BACKEND_DIR) {
    //       // Launch backend in background
    //       bat 'start "Back" /B cmd /c "node app.js"'
    //     }
    //   }
    // }

    stage('Deploy with PM2') {
      steps {
        script{
       // Clean PM2 state directory
        bat 'if exist "%PM2_HOME%" rd /s /q "%PM2_HOME%"'

        // Stop existing processes
        bat 'npx pm2 stop mern-backend || true'
        bat 'npx pm2 delete mern-backend || true'
                    
        bat 'npx pm2 stop mern-frontend || true'
        bat 'npx pm2 delete mern-frontend || true'

        
        
       
      }
        // Start backend service correctly
        dir(BACKEND_DIR) {
          bat "npx pm2 start app.js --name mern-backend --cwd %CD%"
        }

        // Start frontend service correctly using serve
        dir(FRONTEND_DIR) {
          bat "npx pm2 start npx --name mern-frontend --cwd %CD% -- serve -s build -l 3000"
        }
    
    }
  }

  post {
    success { echo '✅ Build & Deploy successful!' }
    failure { echo '❌ Build or Deploy failed, check logs.' }
  }
}
