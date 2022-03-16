FROM node:16-alpine AS build-env

ENV NEXT_TELEMETRY_DISABLED 1

COPY /package.json ./package.json

FROM gcr.io/distroless/nodejs:16 AS runner

ENV NODE_ENV production
ENV PORT 8080
ENV NEXT_TELEMETRY_DISABLED 1

COPY /next.config.js ./
COPY /public ./public
COPY /.next ./.next
COPY /node_modules ./node_modules

CMD ["./node_modules/next/dist/bin/next", "start"]
