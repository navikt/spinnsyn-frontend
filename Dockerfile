FROM gcr.io/distroless/nodejs:16

ENV NODE_ENV production

COPY /next.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

CMD ["./node_modules/next/dist/bin/next", "start"]
