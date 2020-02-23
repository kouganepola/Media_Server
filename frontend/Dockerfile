FROM node:10.19.0-alpine

RUN mkdir -p /app/frontend
WORKDIR /app/frontend

COPY package*.json /app/frontend

RUN npm install
RUN npm install -g @angular/cli@7.3.8

COPY . /app/frontend

CMD ["npm","start"]