# Stage 1: 
# building the app
FROM node:18-alpine AS builder
WORKDIR /app

# Make sure local node_modules bin is on PATH (optional but useful)
ENV PATH /app/node_modules/.bin:$PATH

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies (use ci for reproducible installs)
RUN npm ci --silent

# Copy rest of the source
COPY . .

# Build the production bundle (Vite outputs to /dist)
RUN npm run build

# Stage 2:
# Deploying with nginx server
FROM nginx:stable-alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config to enable /api proxy to backend
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
