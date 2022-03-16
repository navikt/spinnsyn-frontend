FROM gcr.io/distroless/nodejs:16

ENV NODE_ENV production

COPY /next.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

EXPOSE 8080

CMD ["./node_modules/next/dist/bin/next", "start"]
