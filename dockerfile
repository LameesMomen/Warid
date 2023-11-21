
# # Use an official Node runtime as a parent image
# FROM node:18-alpine as build-stage

# # Set the working directory to /app
# WORKDIR /app

# # Copy package.json and package-lock.json to the container
# COPY . .

# # Install dependencies
# RUN npm install --legacy-peer-deps



# # Build the app
# RUN npm run build

# FROM nginx:stable-alpine as production-stage

# WORKDIR /usr/share/nginx/html 

# RUN rm -rf ./*

# COPY --from=build-stage /app/dist/warid/. .

# COPY nginx.conf /etc/nginx/nginx.conf

# COPY daemon.json /etc/docker/daemon.json

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --legacy-peer-deps

# Copy the Angular app files to the working directory
COPY . .

# Build the Angular app
RUN npm run build

# Use Nginx as a web server
FROM nginx:alpine

COPY --from=0 /usr/src/app/dist/ /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
