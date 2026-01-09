FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY server.js ./

# Create state directory
RUN mkdir -p /app/state

EXPOSE 3000

CMD ["npm", "start"]
