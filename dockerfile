# Stage 1: Build the React application using Vite
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install npm globally and install all dependencies, including devDependencies
RUN npm install -g npm@10.8.2
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application using Nginx (optional)
FROM nginx:alpine

# Copy the build output to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx will use
EXPOSE 4000

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
