FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3050
# CMD [ "node", "server.js"]
# CMD [ "node --polyglot --jvm", "server.js"]
CMD node client.js