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
     stage('Serve Frontend') {
      steps {
        dir(FRONTEND_DIR) {
          // Launch serve in background
          bat 'start "Front" /B cmd /c "npx serve -s build -l 3002"'
        }
      }
    }
    stage('Start Backend') {
      steps {
        dir(BACKEND_DIR) {
          // Launch backend in background
          bat 'start "Back" /B cmd /c "node app.js"'
        }
      }
    }

//     stage('Deploy with PM2') {
//       steps {
// script {
//                     // It's generally safer to delete specific PM2 processes by name rather than
//                     // attempting to clean the entire PM2_HOME directory, which might affect other apps.

//                     echo "Stopping and deleting old PM2 processes if they exist..."
//                     // Gracefully stop the processes first, then delete them from PM2's list.
//                     // '|| true' makes the command succeed even if the process is not found,
//                     // preventing the pipeline from failing.
//                     bat 'npx pm2 stop mern-backend || true'
//                     bat 'npx pm2 delete mern-backend || true'
                    
//                     bat 'npx pm2 stop mern-frontend || true'
//                     bat 'npx pm2 delete mern-frontend || true'

//                     echo "Starting backend process with PM2..."
//                     // Start the backend application.
//                     // Ensure 'app.js' is the correct entry point for your backend.
//                     bat "npx pm2 start node --name mern-backend --cwd %CD%\\${BACKEND_DIR} -- script app.js"

//                     echo "Starting frontend serve process with PM2..."
//                     // Start serving the frontend build.
//                     // This assumes the 'serve' package is accessible via npx.
//                     // For production, consider Nginx/Apache for static file serving.
//                     bat "npx pm2 start npx --name mern-frontend --cwd %CD%\\${FRONTEND_DIR}\\build -- serve -s . -l 3000"

//                     echo "PM2 processes started. Check 'npx pm2 list' for status."
//                 }
//       }
//     }
  }

  post {
    success { echo '✅ Build & Deploy successful!' }
    failure { echo '❌ Build or Deploy failed, check logs.' }
  }
}
