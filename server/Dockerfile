# Pull Docker Hub base image
FROM ubuntu:20.04
#or use ubuntu-upstart:12.04
# FROM ubuntu:latest
RUN apt-get update 
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install build-essential -y 
RUN apt-get install -y manpages-dev 
RUN apt-get install -y nodejs 
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa 
RUN apt-get install -y python3.8 
RUN apt-get install -y default-jre 
RUN apt-get install -y default-jdk
RUN apt-get update 
# Set working directory
WORKDIR /usr/app/server
# Install app dependencies
COPY package*.json ./
RUN npm install -qy
RUN npm install -gqy nodemon 
# Copy app to container
COPY . .
# Run the "dev" script in package.json
CMD ["npm", "run", "dev"]