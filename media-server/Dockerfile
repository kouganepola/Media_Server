FROM node:10.19.0-alpine

RUN mkdir -p /app/baackend
WORKDIR /app/baackend

COPY package*json /app/baackend

RUN npm install
COPY . /app/backend


CMD ["npm","start"]