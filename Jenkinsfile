
pipeline {
    agent any

    tools {
        gradle 'Gradle-8.10'
        nodejs 'node-20.15.0'
    }

    environment {
        FRONTEND_DIR = './frontend'
        BACKEND_DIR = './backend/mijung'
    }

    triggers {
        pollSCM 'H 12,5,23 * * 1-5'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checkout processing...'
                checkout scm
                git branch: 'dev',
                    changelog: false,
                    credentialsId: 'gitlab-credential',
                    poll: false,
                    url: 'https://lab.ssafy.com/s11-bigdata-dist-sub1/S11P21D107.git'
                echo 'Checkout done'
            }
        }
        stage('Builds') {
            parallel {
                stage('BE Build') {
                    steps {
                        echo 'BE Building...'
                        dir(${BACKEND_DIR}) {
                            sh 'chmod +x ./gradlew'
                            sh './gradlew clean build'
                        }
                        echo 'BE Building complete.'
                    }
                }
                stage('FE Build') {
                    steps {
                        echo 'FE Building...'
                        dir(${FRONTEND_DIR}) {
                            sh 'npm install'
                            sh 'npm run build'
                        }
                        echo 'FE Building complete.'
                    }
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                echo 'doing test stuff...'
            }
        }
        stage('Build docker images & deliver') {
            stages {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        passwordVariable: 'DOCKER_PASSWORD',
                        usernameVariable: 'DOCKER_USERNAME'
                )]) {
                    stage('Docker Image build') {
                        dir(${BACKEND_DIR}) {
                            echo 'Building BE docker image...'
                            sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                            sh "docker build -t $DOCKER_USERNAME/mijung_backend:${env.BUILD_ID} ."
                            sh "docker tag $DOCKER_USERNAME/mijung_backend:${env.BUILD_ID} $DOCKER_USERNAME/mijung_backend:latest"
                            sh "docker push $DOCKER_USERNAME/mijung_backend:latest"
                            echo 'Building BE docker image complete.'
                        }
                        dir(${FRONTEND_DIR}) {
                            echo 'Building FE docker image...'
                        }
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'echo "doing delivery stuff..."'
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