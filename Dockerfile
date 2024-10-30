FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app

RUN apk update && apk add postgresql-client
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .

EXPOSE 8000

RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
