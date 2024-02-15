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

# Build the Next.js application
RUN yarn dev

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["yarn", "dev"]
