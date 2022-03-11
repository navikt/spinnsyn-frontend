FROM node:16-alpine AS build-env
COPY . /app
WORKDIR /app

FROM gcr.io/distroless/nodejs:16

COPY /next.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /package.json ./package.json
COPY /node_modules ./node_modules

COPY --from=build-env /app /app

ENV NODE_ENV production
EXPOSE 8080
CMD ["npm", "start"]
