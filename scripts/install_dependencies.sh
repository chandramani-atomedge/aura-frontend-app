#!/bin/bash
set -e

# Update package index and install apache2 and unzip
sudo apt-get update -y
sudo apt-get install docker.io -y
sudo apt-get install unzip

sudo curl -L "https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Enable Docker service to start on boot
sudo systemctl start docker
sudo systemctl enable docker
   
# Log in to AWS ECR
TOKEN=$(aws ecr get-login-password --region us-east-1)
if [ -z "$TOKEN" ]; then
    echo "Failed to get ECR login token" >&2
    exit 1
fi
echo "$TOKEN" | sudo docker login --username AWS --password-stdin 270514764245.dkr.ecr.us-east-1.amazonaws.com

#docker pull 270514764245.dkr.ecr.us-east-1.amazonaws.com/static-website:latest

docker pull 270514764245.dkr.ecr.us-east-1.amazonaws.com/aura-frontend:latest

docker rm -f aura-frontend || true

# docker network create aura-network

#docker run -d --name aura-app --hostname localhost -e "AWS_ACCESS_KEY_ID=AKIAT567PXHK6WVKNEOS3" -e "AWS_SECRET_ACCESS_KEY=9yZfLNgfLmMtIc+uERbDFw+jygll+MtjuX8rqWZKl" -e "OTP_API_KEY=5d7dbdd8-6498-11ef-8b60-0200cd936042" -p 80:80 -d 270514764245.dkr.ecr.us-east-1.amazonaws.com/static-website:latest

#docker pull 270514764245.dkr.ecr.us-east-1.amazonaws.com/aura-app:leavetype

#docker network create aura-network

#docker run -d --name aura-app --hostname localhost --network aura-network -e "AWS_ACCESS_KEY_ID=AKIAT567PXHK6WVKNEOS3" -e "AWS_SECRET_ACCESS_KEY=9yZfLNgfLmMtIc+uERbDFw+jygll+MtjuX8rqWZKl" -e "OTP_API_KEY=5d7dbdd8-6498-11ef-8b60-0200cd936042" -p 80:80 -d 270514764245.dkr.ecr.us-east-1.amazonaws.com/aura-app:leavetype

sudo docker run -d -p 3000:3000 --name aura-frontend 270514764245.dkr.ecr.us-east-1.amazonaws.com/aura-frontend:latest
