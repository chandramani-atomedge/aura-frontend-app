#!/bin/bash

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

# docker rm -f 270514764245.dkr.ecr.us-east-1.amazonaws.com/aura-frontend:latest || true
 
# NETWORK_NAME="aura-network"

# # Check if the network already exists
# if docker network ls --format '{{.Name}}' | grep -w "$NETWORK_NAME" > /dev/null; then
#     echo "Network '$NETWORK_NAME' already exists."
# else
#     # Create the network if it doesn't exist
#     docker network create "$NETWORK_NAME"
#     echo "Network '$NETWORK_NAME' created."
# fi

#sudo docker run -d -p 80:80 --name aura-frontend --network aura-network 270514764245.dkr.ecr.us-east-1.amazonaws.com/aura-frontend:latest
