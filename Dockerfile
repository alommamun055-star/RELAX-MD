FROM node:lts-buster

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install -g pm2
RUN npm install

# Copy all files
COPY . .

# Expose port
EXPOSE 9090

# Start bot
CMD ["npm", "start"]