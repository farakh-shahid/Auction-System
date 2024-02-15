# Use official Node.js image as base
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 5001

# Command to run the app
CMD ["yarn", "start:dev"]
