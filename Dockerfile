FROM node:16-alpine

ENV NODE_ENV production

COPY server/dist/index.js .

COPY /next.config.js ./
COPY /public ./public
COPY /.next ./.next
COPY /node_modules ./node_modules
COPY /package.json ./package.json

CMD ["npm", "start"]

EXPOSE 8080
