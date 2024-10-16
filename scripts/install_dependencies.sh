#!/bin/bash
set -e

# Update package index and install apache2 and unzip
sudo apt-get update -y
sudo apt-get install unzip

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

docker pull 270514764245.dkr.ecr.us-east-1.amazonaws.com/aura-frontend:latest

docker rm -f aura-frontend || true
 
# docker network create aura-network

sudo docker run -d -p 80:80 --name aura-frontend --network aura-network 270514764245.dkr.ecr.us-east-1.amazonaws.com/aura-frontend:latest
