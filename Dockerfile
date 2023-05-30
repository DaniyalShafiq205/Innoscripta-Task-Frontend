# Base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project files to the working directory
COPY . .

# Expose the port on which the React app will run
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
