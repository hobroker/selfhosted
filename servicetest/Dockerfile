FROM node:14

ENV PORT=3000
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci
COPY . .

EXPOSE $PORT
CMD [ "npm", "start" ]
