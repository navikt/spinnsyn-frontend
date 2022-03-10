FROM node:16-alpine as basebuilder

FROM gcr.io/distroless/nodejs@sha256:750adc59f214968b8a7b2913c85e18a2b7946bedea2e78b8104df3905cb6410a

COPY /next.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /package.json ./package.json

COPY --from=basebuilder /node_modules ./node_modules
ENV NODE_ENV production
EXPOSE 8080
CMD ["npm", "start"]
