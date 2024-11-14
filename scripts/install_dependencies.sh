#!/bin/bash

# Update package index and install apache2 and unzip
sudo apt-get update -y
sudo apt-get install unzip

# Enable Docker service to start on boot
sudo systemctl start docker
sudo systemctl enable docker
   

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 270514764245.dkr.ecr.us-east-1.amazonaws.com

IMAGE_TAG=$(aws ssm get-parameter --name "frontend-image-tag" --region ap-south-1 --query "Parameter.Value" --output text)

# docker rm -f 270514764245.dkr.ecr.us-east-1.amazonaws.com/aura-middleware:latest || true

# docker pull 270514764245.dkr.ecr.us-east-1.amazonaws.com/aura-middleware:$IMAGE_TAG

docker pull 270514764245.dkr.ecr.us-east-1.amazonaws.com/aura-frontend:$IMAGE_TAG
