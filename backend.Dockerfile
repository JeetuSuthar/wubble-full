FROM node:18-alpine

WORKDIR /app


COPY server/ ./


RUN npm init -y && npm install express cors

EXPOSE 3001


CMD ["node", "index.js"]