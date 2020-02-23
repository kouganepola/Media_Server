FROM node:10.19.0-alpine
RUN apk add g++ make python
RUN mkdir -p /app/backend
WORKDIR /app/backend

COPY package*.json /app/backend/

RUN npm install
COPY . /app/backend


CMD ["npm","start"]