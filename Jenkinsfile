pipeline {
  agent any

  tools {
    nodejs "Node 20" // This should match the name you configured in Jenkins
  }

  environment {
    FRONTEND_DIR = "frontend"
    BACKEND_DIR = "backend"
  }

  stages {
    stage('Install Frontend') {
      steps {
        dir("${FRONTEND_DIR}") {
          bat 'npm install'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir("${FRONTEND_DIR}") {
          bat 'npm run build'
        }
      }
    }

    stage('deploy Frontend') {
      steps {
        dir("${FRONTEND_DIR}") {
          bat 'npx serve -s build -l 3000'
        }
      }
    }

    stage('Install Backend') {
      steps {
        dir("${BACKEND_DIR}") {
          bat 'npm install'
        }
      }
    }

    // stage('Test Backend') {
    //   steps {
    //     dir("${BACKEND_DIR}") {
    //       bat 'npm test || echo "No tests found."'
    //     }
    //   }
    // }

    stage('Start Backend') {
      steps {
        dir("${BACKEND_DIR}") {
          bat 'npm start'
        }
      }
    }
  }


  post {
    success {
      echo '✅ MERN app built and deployed successfully!'
    }
    failure {
      echo '❌ Build failed. Check logs.'
    }
  }
}