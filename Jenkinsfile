pipeline {
  agent any
  environment {
    // Ensures docker command works on macOS Jenkins
    PATH = "/usr/local/bin:${env.PATH}"
    IMAGE = "jenkins-basis-pipeline"
  }

  stages {
    stage('Build Docker Image') {
      steps {
        echo "Pulling latest code and building Docker image..."
        sh 'docker --version'
        sh 'docker build -t ${IMAGE}:${BUILD_NUMBER} .'
      }
    }

    stage('Run Container (verify)') {
      steps {
        echo "Running container briefly to test..."
        sh '''
          CID=$(docker run -d --rm -p 8080:8080 ${IMAGE}:${BUILD_NUMBER})
          sleep 3
          echo "Container Logs:"
          docker logs "$CID"
          echo "Testing App Output:"
          curl -s http://localhost:8080 || true
          docker rm -f "$CID" || true
        '''
      }
    }
  }

  post {
    always {
      sh 'docker images ${IMAGE} || true'
    }
    success {
      echo " Pipeline completed successfully!"
    }
    failure {
      echo " Pipeline failed — check console output."
    }
  }
}
