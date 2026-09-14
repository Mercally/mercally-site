# Multi-stage build for Angular app

# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Replace the default nginx site and copy the Angular browser build.
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/mercally-site/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
