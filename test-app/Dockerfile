# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install mocha globally
RUN npm install -g mocha

# Copy the local source files to the working directory
COPY . .

# Run the test script
CMD ["npm", "test"]
