
# Use an official Node runtime as a parent image
FROM node:18-alpine as build-stage

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps



# Build the app
RUN npm run build

FROM nginx:stable-alpine as production-stage

WORKDIR /usr/share/nginx/html 

RUN rm -rf ./*

COPY --from=build-stage /app/dist/warid .

COPY nginx.conf /etc/nginx/nginx.conf

COPY daemon.json /etc/docker/daemon.json

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
