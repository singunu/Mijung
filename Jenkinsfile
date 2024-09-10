pipeline {
  agent any

  tools {
    gradle 'Gradle-8.10'
    nodejs 'node-20.15.0'
  }

  triggers {
    pollSCM 'H 12,5,23 * * 1,2,3,4,5'
  }

  stages {
    stage ('Checkout') {
      steps {
        echo 'Chckout processing...'
        checkout scm
        git branch: 'dev', changelog: false, credentialsId: 'gitlab-credential', poll: false, url: 'https://lab.ssafy.com/s11-bigdata-dist-sub1/S11P21D107.git'
        echo 'Checkout done'
      }
    }
    stage('Build') {
      parallel {
        stage('BE Build') {
          // stages{
            // stage('BE-Build') {
              steps {
                echo 'BE Building...'
                dir('./backend/mijung') {
                  sh 'chmod +x ./gradlew'
                  sh './gradlew clean build'
                }
                echo 'BE Building complete.'
              }
            // }
          // }
        }
        stage('FE Build') {
          // stages{
            // stage('FE-Build') {
              steps {
                echo 'FE Building...'
                dir('./frontend') {
                  sh 'npm install'
                  sh 'npm run build'
                }
                echo 'FE Building complete.'
              }
            // }
          // }
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
    // stage('Docker image & deliver') {
    //   parallel {
    //     stage('Build BE image') {
    //       steps {
    //         echo 'Building BE docker image...'
    //         dir('./backend/mijung/') {
    //           sh "docker build ."
    //         }
    //       }
    //     }
    //   }
    // }
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
  post {
    success {
      echo 'Build Success.'
    }
    failure {
      echo 'Build Fail.'
    }
  }
}