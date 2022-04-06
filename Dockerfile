FROM node:16-alpine

WORKDIR /app

COPY . .

RUN yarn

RUN yarn tsc
EXPOSE 3000

CMD [ "node", "bin/www" ]
