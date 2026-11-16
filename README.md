# spinnsyn-frontend

Applikasjon som viser vedtak mottatt fra `Speil` til sluttbruker på nav.no. Henter data
fra [spinnsyn-backend](https://github.com/navikt/spinnsyn-backend).

Lever under:

- prod-gcp: [https://www.nav.no/syk/sykepenger](https://www.nav.no/syk/sykepenger)
- dev-gcp: [https://www.ekstern.dev.nav.no/syk/sykepenger](https://www.ekstern.dev.nav.no/syk/sykepenger)
- labs-gcp (demo): [https://sykepenger.labs.nais.io/syk/sykepenger](https://sykepenger.labs.nais.io/syk/sykepenger)

# spinnsyn-frontend-arkivering

Variant av spinnsyn-frontend som returnerer serverside rendret vedtak som spinnsyn-arkivering gjør om til pdf.
Testes ved å se på dokumentet som havner i gosys eller ved å bruke denne hjelperen i dev:

https://spinnsyn-arkivering.dev.nav.no/api/test/pdf/:fnr/:vedtakid

# spinnsyn-frontend-saksbehandler

Variant av spinnsyn-frontend som saksbehandlere åpner fra Speil. Viser ett vedtak slik den sykmeldte ser det, basert
på `id` (utbetalingId) i URL-en. Vedtaket hentes fra `spinnsyn-backend` med OBO-token.

Saksbehandlere logger inn med Azure AD og Wonderwall. Bare medlemmer av gruppene `speil-brukere` og
`0000-CA-Speil_Lesetilgang` har tilgang (i prod også `tbd`).

Lever under:

- prod-gcp: https://spinnsyn-frontend-saksbehandler.intern.nav.no/syk/sykepenger?id=:utbetalingId
- dev-gcp: https://spinnsyn-frontend-saksbehandler.intern.dev.nav.no/syk/sykepenger?id=:utbetalingId

For å teste lokalt med mock-data:

```sh
npm run saksbehandler
```

Og gå til http://localhost:3000/syk/sykepenger?id=00000000-0000-0000-0000-000000000000 (alle gyldige UUID-er fungerer).

## Tilgang til Github Package Registry

Siden vi bruker avhengigheter som ligger i GPR, så må man sette opp tilgang til GPR med en PAT (personal access token)
som har `read:packages`. Du kan [opprette PAT her](https://github.com/settings/tokens). Dersom du har en PAT som du
bruker for tilgang til maven-packages i github kan du gjenbruke denne.

I din `.bashrc` eller `.zshrc`, sett følgende miljøvariabel:

`export NPM_AUTH_TOKEN=<din PAT med read:packages>`

## Kjør lokalt uten backend

```sh
npm run dev
```

## Enhetstester

```sh
npm run test
```

## Playwright tester

```sh
npm run play
```

## Dette logges i Umami

| brukers handling/logg                                        | Skjemanavn | Destinasjon | tekst | komponent | Tidligere lest | Revurdert | Annulert | Refusjon | Brukerutbetaling | Flere vedtK |
|--------------------------------------------------------------|:----------:|:-----------:|:-----:|:---------:|:--------------:|:---------:|:--------:|:--------:|:----------------:|:-----------:|
| Åpne skjema                                                  |     x      |             |       |           |                |           |          |    x     |        x         |      X      |
| Navigasjon til et vedtak                                     |     x      |      x      |       |           |       x        |     x     |    x     |          |                  |             |
| Navigasjon til "kontakt oss"                                 |     x      |      x      |   x   |           |                |           |          |          |                  |             |
| Navigasjon til "retten til å klage"                          |     x      |      x      |   x   |           |                |           |          |          |                  |             |
| Navigasjon til "klage veilederen"                            |     x      |      x      |   x   |           |                |           |          |          |                  |             |
| Navigasjon til "Les mer om når du kan forvente å få pengene" |     x      |      x      |   x   |           |                |           |          |          |                  |             |
| Ekspandere utbetalingsinformasjon (grønn panel)              |            |             |       |     x     |                |           |          |          |                  |             |
| Ekspandere avviste dager (Gul panel)                         |            |             |       |     x     |                |           |          |          |                  |             |
| Ekspandere gjenstående sykepengedager (Blå panel)            |            |             |       |     x     |                |           |          |          |                  |             |
| Ekspandere "Beregning av sykepengene"                        |            |             |       |     x     |                |           |          |          |                  |             |
| Ekspandere "Sykepenger per dag"                              |            |             |       |     x     |                |           |          |          |                  |             |
| Ekspandere "Mer om beregningen"                              |            |             |       |     x     |                |           |          |          |                  |             |
| Ekspandere "Dager Nav ikke utbetaler"                        |            |             |       |     x     |                |           |          |          |                  |             |

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles til flex@nav.no

## For Nav-ansatte

Interne henvendelser kan sendes via Slack i kanalen #flex.
