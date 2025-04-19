FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 3000

# CMD ["echo", "Starting the application..."]

# Fix the command to use npx or the local binary path
CMD [ "npm", "run", "dev" ]