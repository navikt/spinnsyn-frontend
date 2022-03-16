FROM gcr.io/distroless/nodejs@sha256:893e1da9499e70ea3ef18e90b39e1ce1ee09474851c9d6028d152519aa6a3d87

ENV NODE_ENV production

COPY /next.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080

CMD ["./node_modules/next/dist/bin/next", "start"]
