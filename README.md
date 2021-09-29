# spinnsyn-frontend

Applikasjon som viser vedtak mottatt fra `Speil`. Henter data fra [spinnsyn-backend](https://github.com/navikt/spinnsyn-backend).

Lever under:

- prod-gcp: [https://www.nav.no/syk/sykepenger](https://www.nav.no/syk/sykepenger)
- dev-gcp: [https://www-gcp.dev.nav.no/syk/sykepenger](https://www-gcp.dev.nav.no/syk/sykepenger)
- labs-gcp (demo): [https://sykepenger.labs.nais.io/syk/sykepenger](https://sykepenger.labs.nais.io/syk/sykepenger)

## Kjør lokalt uten backend

```sh
npm run start-mock
```

## Kjør lokalt i docker-compose

Endre image i flex-docker-compose fra:

```text
image: "docker.pkg.github.com/navikt/spinnsyn-frontned/spinnsyn-frontend:latest"
```

Til:

```text
image: "spinnsyn-frontend:latest"
```text

Bygg og tag nytt image ved å kjøre:

```sh
./buildlatest.sh
```

## Enhetstester

```sh
npm run test
```

## Cypress tester

```sh
npm run e2e
```

## Kontakt oss

Kanalen `flex` på Slack.

## Debugging med sourcemaps

Ved feil i produksjon vil en minimert stacktrace logges til frontendlogger.
Ved å laste ned artifikaten sources-with-sourcemaps fra GHA for bygget hvor feilen oppstod kan man sammen med skriptet sourcemap-debug.js finne ut av hvor i originalkoden feilen oppstod.

Se også [https://stackoverflow.com/questions/33128859/how-can-i-take-a-minified-javascript-stack-trace-and-run-it-against-a-source-map](https://stackoverflow.com/questions/33128859/how-can-i-take-a-minified-javascript-stack-trace-and-run-it-against-a-source-map)
