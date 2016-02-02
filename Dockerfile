FROM node:5.5
MAINTAINER Dan Levy <Dan@DanLevy.net>
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm i -g nodemon
ENTRYPOINT ["npm", "start"]

