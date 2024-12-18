pipeline {
    environment {
        DOCKERHUB_CRED = credentials("Docker_Credentials_ritik")
        MONGO_URI = credentials("mongo-uri")
        SECRET_KEY = credentials("cloud_secret_key")
        CLOUD_NAME = credentials("cloud_name")
        API_KEY = credentials("cloud_api_key")
        API_SECRET = credentials("cloud_api_secret")
        PORT = "8000" 
        MINIKUBE_HOME = '/home/jenkins/.minikube'
        VAULT_PASS = credentials("ansible_vault_pass")
        BECOME_PASS = credentials("ansible_vault_pass")
    }
    agent any
    tools {nodejs "NODEJS"} 
    stages {
        stage("Stage 1: Git Clone") {
            steps {
                sh '''
                [ -d Talent_Bridge_Compose ] && rm -rf Talent_Bridge_Compose
                git clone https://github.com/ritik-rkg/Talent_Bridge_Compose.git
                '''
            }
        }

        stage("Stage 2: Backend Testing") {
            steps {
                sh '''
                cd backend
                npm i
                cd tests
                npm install mocha chai sinon prom-client
                npm test
                '''
            }
        }

        stage("Stage 3: Build frontend") {
            steps {
                sh '''
                cd Talent_Bridge_Compose/frontend
                npm install
                npm run build
                '''
            }
        }
        stage("Stage 4: Remove docker images and container") {
            steps {
                sh "docker container prune -f"
                sh "docker image prune -a -f"
            }
        }
       
        

        stage("Stage 5: Creating Docker Image for frontend") {
            steps {
                sh '''
                cd Talent_Bridge_Compose/frontend
                docker build -t ritikgupta0114/frontend:latest .
                '''
            }
        }

        stage("Stage 6: Scan Docker Image for frontend") {
            steps {
                sh '''
                trivy image ritikgupta0114/frontend:latest
                '''
            }
        }

        stage("Stage 7: Push Frontend Docker Image") {
            steps {
                sh '''
                docker login -u ${DOCKERHUB_CRED_USR} -p ${DOCKERHUB_CRED_PSW}
                docker push ritikgupta0114/frontend:latest
                '''
            }
        }
        

        stage("Stage 8: Creating Docker Image for backend") {
            steps {
                sh '''
                cd Talent_Bridge_Compose/backend
                docker build -t ritikgupta0114/backend:latest .
                '''
            }
        }

        stage("Stage 9: Scan Docker Image for backend") {
            steps {
                sh '''
                trivy image ritikgupta0114/backend:latest
                '''
            }
        }


        stage("Stage 10: Push Backend Docker Image") {
            steps {
                sh '''
                docker login -u ${DOCKERHUB_CRED_USR} -p ${DOCKERHUB_CRED_PSW}
                docker push ritikgupta0114/backend:latest
                '''
            }
        }

        

        stage("Stage 11: Ansible") {
            steps {
                sh '''
                cd Talent_Bridge_Compose
                echo "$VAULT_PASS" > /tmp/vault_pass.txt
                chmod 600 /tmp/vault_pass.txt
                
                # Export become password if needed
                echo "$BECOME_PASS" > /tmp/become_pass.txt
                chmod 600 /tmp/become_pass.txt
                
                # Run the Ansible playbook with sudo privilege
                ansible-playbook -i inventory --vault-password-file /tmp/vault_pass.txt --extra-vars "ansible_become_pass=$(cat /tmp/become_pass.txt)" playbook-new.yaml
                
                # Clean up sensitive files
                rm -f /tmp/vault_pass.txt /tmp/become_pass.txt
                '''
            }
        }
    }
}
