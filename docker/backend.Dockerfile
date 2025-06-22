# Use Node.js base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy root-level package.json and package-lock.json
COPY package*.json ./

# Install only prod dependencies (edit if needed)
RUN npm install

# Copy only the server folder
COPY server/ ./server

# Set the command to run the server
CMD ["node", "server/index.js"]

# Expose the backend port
EXPOSE 3001
