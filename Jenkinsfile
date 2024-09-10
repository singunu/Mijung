pipeline {
  agent any

  tools {
    gradle 'Gradle-8.10'
    nodejs 'nodeJS-20.15.0'
  }
  triggers {
    pollSCM 'H 12,5,23 * * 1,2,3,4,5'
  }
  stages {
    stage ('Clean workspace') {
      steps {
        echo 'Cleaning workspace...'
        cleanWs()
        echo 'Cleaning done'
      }
    }
    stage ('Clone') {
      steps {
        echo 'Cloing...'
      }
    }
    stage('Build') {
      parallel {
        stage('BE Process') {
          stages{
            stage('BE-Build') {
              steps {
                echo 'BE Building...'
                dir('./backend') {
                  sh './gradlew clean build -x test'
                }
                echo 'BE Building complete.'
              }
            }
          }
        }
        stage('FE Process') {
          stages{
              stage('FE-Build') {
                steps {
                  echo 'FE Building...'
                  dir('./frontend') {
                    sh 'npm i'
                    sh 'npm run build'
                  }
                  echo 'FE Building complete.'
                }
              }
          }
        }
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
    post {
      success {

      }
      failure {

      }
    }
  }
}