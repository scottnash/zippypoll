FROM node:8-alpine

RUN mkdir /app

# move in package and lock
COPY package.json package-lock.json /app/
WORKDIR /app

# install application deps
RUN npm install

# move in the rest of the content
COPY . /app

EXPOSE 8081

CMD ["npm", "run", "start"]
