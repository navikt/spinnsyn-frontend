FROM gcr.io/distroless/nodejs20-debian12@sha256:3f46c2fa879281ea5969d0aedd52ba1d82ed7687d0b68df850d2056564285efd

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
