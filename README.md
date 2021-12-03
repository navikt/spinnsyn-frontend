# spinnsyn-frontend
Hovedvarianten av denne applikasjonen.
Applikasjon som viser vedtak mottatt fra `Speil` til sluttbruker på nav.no. Henter data fra [spinnsyn-backend](https://github.com/navikt/spinnsyn-backend).

Lever under:

- prod-gcp: [https://www.nav.no/syk/sykepenger](https://www.nav.no/syk/sykepenger)
- dev-gcp: [https://www-gcp.dev.nav.no/syk/sykepenger](https://www-gcp.dev.nav.no/syk/sykepenger)
- labs-gcp (demo): [https://sykepenger.labs.nais.io/syk/sykepenger](https://sykepenger.labs.nais.io/syk/sykepenger)

# spinnsyn-frontend-arkivering
Variant av spinnsyn-frontend som returnerer serverside rendret vedtak som spinnsyn-arkivering gjør om til pdf.
Testes ved å se på dokumentet som havner i gosys eller ved å bruke denne hjelperen i dev:

https://spinnsyn-arkivering.dev.nav.no/api/test/pdf/:fnr/:vedtakid

## Kjør lokalt uten backend

```sh
npm run dev
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
