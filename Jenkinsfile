pipeline {
    agent any
    trigers {
      pollSCM '*/5 * * * *'
    }
    stages {
        stage('Build') {
            steps {
                // 빌드 단계 명령어
                echo 'Building..'
                sh '''
                  echo "doing build stuff..."
                '''
            }
        }
        stage('Test') {
            steps {
                // 테스트 단계 명령어
                echo 'Testing..'
                sh '''
                  echo "doing test stuff..."
                '''
            }
        }
        stage('Deploy') {
            steps {
                // 배포 단계 명령어
                echo 'Deploying....'
                sh '''
                  echo "doing delivery stuff..."
                '''
            }
        }
    }
}