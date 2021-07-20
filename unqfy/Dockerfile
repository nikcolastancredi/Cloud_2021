FROM node:14

ENV NODE_ENV=development
ENV DEBUG=true

WORKDIR /home/node/unqfy

COPY package.json .
COPY package-lock.json .

RUN ["npm", "install"]

EXPOSE 8000

COPY . /home/node/unqfy/

#VOLUME ["/home/node/unqfy/app_data"]
# node:users 
RUN chown -R 777 /home/node/unqfy

#USER node

CMD [ "node", "src/api/api.js" ]