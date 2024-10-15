## To build the front application as Docker container use the below command. First clone repo from github and change to the directory 

~~~~
cd aura-frontend
~~~~

## Build the docker images

~~~~
docker build -t aura-frontend .
~~~~
## Test whether the container is running from the build image without any error

~~~~
docker run -d --name aura-front-cont --network aura-network -p 3000:3000 aura-frontend
~~~~

## Optional:  Note - Ensure your local has docker network aura-network created. if not create it using

~~~~
docker network create aura-network 
~~~~

## Note: Ensure your local host has AWS CLI installed and configured to it.Then login to the ECR with below command.

~~~~
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 270514764245.dkr.ecr.us-east-1.amazonaws.com

Note : If you have proper authorization execute the above command your login will be succeeded 
~~~~
## After the build completes, tag your image so you can push the image to this repository:
~~~~
docker tag aura-frontend:latest 270514764245.dkr.ecr.us-east-1.amazonaws.com/aura-frontend:latest
~~~~

## Run the following command to push this image to your newly created AWS repository
~~~~
docker push 270514764245.dkr.ecr.us-east-1.amazonaws.com/aura-frontend:latest
~~~~

## 
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# aura-web-app
