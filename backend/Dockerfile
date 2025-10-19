# Using official Node.js LTS image
FROM node:18-alpine

# Create app directory and set as working directory, for production practice i use this path as linux convention
WORKDIR /usr/src/app

# Set NODE_ENV to production by default to avoid the installation of dev dependencies
ENV NODE_ENV=production

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install only production dependencies with silent output
RUN npm ci --only=production --silent

# Copy app source
COPY . .

# Expose default backend port
EXPOSE 4000

# Start the app
CMD ["npm", "start"]
