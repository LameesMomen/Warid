
# Use an official Node runtime as a parent image
FROM node:18-alpine as build-stage

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps


# Copy the current directory contents into the container at /app
COPY . .

# Build the app
RUN npm run build



EXPOSE 80

