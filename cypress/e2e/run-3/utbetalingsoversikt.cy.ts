import { integrasjonsVedtak, vedtakMed40Grad } from '../../../src/data/testdata/data/rs-vedtak'

describe('Utbetalingsoversikt', () => {
    const vedtak = vedtakMed40Grad

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get(`article a[href*=${vedtak.id}]`).click()
    })

    it('Utbetalingsoversikt', () => {
        cy.contains('8 960 kroner').and('contain', 'Utbetales til Pengeløs Sparebank').click({ force: true })

        cy.contains('Sykepenger per dag').click({ force: true })

        // Dager utenfor vedtak fom og tom
        cy.contains('21.01.21').should('not.exist')
        cy.contains('23.01.21').should('not.exist')

        // Dager innenfor vedtak fom og tom
        cy.contains('08.feb.').parent().parent().should('contain', '40% syk').and('contain', '896')
        cy.contains('20.feb.').parent().parent().should('contain', 'Helg').and('contain', '-')
    })

    it('Mer om beregningen har riktig sykepengegrunnlag', () => {
        cy.contains('Mer om beregningen').click({ force: true })

        cy.contains('Inntekter lagt til grunn for sykepengene').click()

        cy.contains('Sykepengegrunnlag').siblings().contains('582 161 kr')

        cy.contains('Flere arbeidsforhold').should('not.exist')
        cy.contains(
            'Har du flere arbeidsforhold, og du til sammen tjener mer enn 6 G, ' +
                'blir reduksjonen fordelt slik at det tilsvarer forholdet mellom inntektene.',
        ).should('not.exist')
    })

    it('Forklaring', () => {
        cy.get('.utbetalingsoversikt .tekstinfo .navds-tag').should('have.text', 'Delvis\u00a0syk' + 'Helg')

        cy.get('.utbetalingsoversikt .tekstinfo').children('.navds-heading').should('have.text', 'Forklaring')
        cy.get('.utbetalingsoversikt .tekstinfo')
            .find('.navds-body-short')
            .should(
                'have.text',
                'Du får sykepenger for den delen av arbeidstiden du ikke jobber. ' +
                    'Vi bruker opplysningene du ga i søknaden, om hvor mye du jobbet i perioden.' +
                    'Sykepenger betales bare for dagene mandag til fredag. Jobber du lørdager og søndager, ' +
                    'blir disse dagene likevel regnet med i sykepengene du får. Inntekten som du har på helgedagene, ' +
                    'blir fordelt på ukedagene.',
            )
    })

    it('Vi går tilbake til oversikten', () => {
        cy.get('*[class^=brodsmulesti] a').contains('Svar på søknader').click()
    })

    it('Sjekker utbetalingsoversikt på vedtak med alle dagtyper', () => {
        cy.get(`article a[href*=${integrasjonsVedtak.id}]`).click()

        cy.get('.ekspanderbar.gronn').click()
        cy.contains('Sykepenger per dag').click({ force: true })

        cy.get('.utbetalingsoversikt').within(() => {
            cy.contains('30.jan.').parent().parent().should('contain', 'Arbeidsdag').and('contain', '-')
            cy.contains('31.jan.')
                .parent()
                .parent()
                .should('contain', 'Arbeidsgiveren\u00a0betaler')
                .and('contain', '-')
            cy.contains('01.feb.').parent().parent().should('contain', 'Syk').and('contain', '1\u00a0000 kr')
            cy.contains('06.feb.').parent().parent().should('contain', 'Helg').and('contain', '-')
            cy.contains('08.feb.').parent().parent().should('contain', '40% syk').and('contain', '400 kr')
            cy.contains('11.feb.').parent().parent().should('contain', 'Fridag').and('contain', '-')
            cy.contains('13.feb.').parent().parent().should('contain', 'Søkt\u00a0for\u00a0sent').and('contain', '-')
            cy.contains('14.feb.').parent().parent().should('contain', 'Ukjent').and('contain', '-')
            cy.contains('15.feb.')
                .parent()
                .parent()
                .should('contain', 'Maks\u00a0antall\u00a0dager')
                .and('contain', '-')
            cy.contains('16.feb.').parent().parent().should('contain', 'For\u00a0lav\u00a0inntekt').and('contain', '-')
            cy.contains('17.feb.').parent().parent().should('contain', 'Egenmelding').and('contain', '-')
            cy.contains('18.feb.')
                .parent()
                .parent()
                .should('contain', 'Sykmeldt\u00a0i\u00a0for\u00a0liten\u00a0grad')
                .and('contain', '-')
            cy.contains('19.feb.').parent().parent().should('contain', 'Jobbet\u00a0for\u00a0kort').and('contain', '-')
            cy.contains('20.feb.').parent().parent().should('contain', 'Ikke\u00a0medlem').and('contain', '-')
            cy.contains('21.feb.').parent().parent().should('contain', 'Etter\u00a0dødsfall').and('contain', '-')
            cy.contains('22.feb.').parent().parent().should('contain', 'Ukjent').and('contain', '-')
            cy.contains('23.feb.').parent().parent().should('contain', 'Over\u00a070\u00a0år').and('contain', '-')
        })

        cy.contains('Forklaring')
            .parent()
            .within(() => {
                cy.get('.navds-tag--small.navds-tag--info').contains('Arbeidsgiveren betaler')
                cy.get('.navds-tag--small.navds-tag--info + .navds-body-short').contains(
                    'Arbeidsgiveren din betaler de første 16 kalenderdagene av sykefraværet.',
                )

                cy.get('.navds-tag--small.navds-tag--info').contains('Arbeidsdag')
                cy.get('.navds-tag--small.navds-tag--info + .navds-body-short').contains(
                    'Du får ikke sykepenger for hele dager du har vært på jobb. ' +
                        'Vi bruker opplysningene du ga i søknaden, om hvor mye du jobbet.',
                )

                cy.get('.navds-tag--small.navds-tag--success').contains('Syk')
                cy.get('.navds-tag--small.navds-tag--success + .navds-body-short').contains(
                    'Du har vært syk en hel dag, og du får sykepenger for denne dagen.',
                )

                cy.get('.navds-tag--small.navds-tag--info').contains('Helg')
                cy.get('.navds-tag--small.navds-tag--info + .navds-body-short').contains(
                    'Sykepenger betales bare for dagene mandag til fredag. ' +
                        'Jobber du lørdager og søndager, blir disse dagene likevel regnet med i sykepengene du får. ' +
                        'Inntekten som du har på helgedagene, blir fordelt på ukedagene.',
                )

                cy.get('.navds-tag--small.navds-tag--success').contains('Delvis syk')
                cy.get('.navds-tag--small.navds-tag--success + .navds-body-short').contains(
                    'Du får sykepenger for den delen av arbeidstiden du ikke jobber. ' +
                        'Vi bruker opplysningene du ga i søknaden, om hvor mye du jobbet i perioden.',
                )

                cy.get('.navds-tag--small.navds-tag--warning').contains('Fridag')
                cy.get('.navds-tag--small.navds-tag--warning + .navds-body-short').contains(
                    'Du får ikke sykepenger for dager du har ferie eller permisjon.',
                )

                cy.get('.navds-tag--small.navds-tag--warning').contains('Ferie')
                cy.get('.navds-tag--small.navds-tag--warning + .navds-body-short').contains(
                    'Du har oppgitt i søknaden at du hadde ferie. I ferien stoppes sykepengene.',
                )

                cy.get('.navds-tag--small.navds-tag--warning').contains('Søkt for sent')
                cy.get('.navds-tag--small.navds-tag--warning + .navds-body-short').contains(
                    'Søknaden må sendes senest tre måneder etter den måneden hver enkelt sykmelding startet.',
                )

                cy.get('.navds-tag--small.navds-tag--info').contains('Ukjent')
                cy.get('.navds-tag--small.navds-tag--info + .navds-body-short').contains(
                    'Vi har ikke mottatt informasjon om denne dagen, så den regnes som arbeidsdag.',
                )

                cy.get('.navds-tag--small.navds-tag--warning').contains('Permisjon')
                cy.get('.navds-tag--small.navds-tag--warning + .navds-body-short').contains(
                    'Du har oppgitt i søknaden at du hadde permisjon. ' +
                        'Du får ikke sykepenger for dager du har permisjon.',
                )

                cy.get('.navds-tag--small.navds-tag--warning').contains('Maks antall dager')
                cy.get('.navds-tag--small.navds-tag--warning + .navds-body-short').contains(
                    'Du har fått sykepenger fra NAV i 248 dager (mandag-fredag). ' +
                        'Det må gå 26 uker uten at du får sykepenger eller arbeidsavklaringspenger før du kan få sykepenger igjen.',
                )

                cy.get('.navds-tag--small.navds-tag--warning').contains('For lav inntekt')
                cy.get('.navds-tag--small.navds-tag--warning + .navds-body-short')
                    .contains(
                        'Du har et sykepengegrunnlag på mindre enn et halvt grunnbeløp i året. ' +
                            'Det betyr at du ikke kan få sykepenger.',
                    )
                    .get('a')
                    .contains('grunnbeløp')
                    .should(
                        'have.attr',
                        'href',
                        'https://www.nav.no/no/nav-og-samfunn/kontakt-nav/utbetalinger/grunnbelopet-i-folketrygden',
                    )

                cy.get('.navds-tag--small.navds-tag--warning').contains('Egenmelding')
                cy.get('.navds-tag--small.navds-tag--warning + .navds-body-short').contains(
                    'Du kan ikke bruke egenmelding de dagene NAV betaler sykepenger. ' +
                        'For de dagene må du ha sykmelding.',
                )

                cy.get('.navds-tag--small.navds-tag--warning').contains('Sykmeldt i for liten grad')
                cy.get('.navds-tag--small.navds-tag--warning + .navds-body-short').contains(
                    'Du må være minst 20 prosent sykmeldt for å få sykepenger.',
                )

                cy.get('.navds-tag--small.navds-tag--warning').contains('Jobbet for kort')
                cy.get('.navds-tag--small.navds-tag--warning + .navds-body-short').contains(
                    'Du må ha vært i arbeid i minst fire uker rett før sykefraværet, ' +
                        'det vil si 28 dager fra og med dagen før du ble sykmeldt.',
                )

                cy.get('.navds-tag--small.navds-tag--warning').contains('Ikke medlem')
                cy.get('.navds-tag--small.navds-tag--warning + .navds-body-short').contains(
                    'Du må være medlem i folketrygden for å få sykepenger. ' +
                        'Du er medlem bare hvis du bor eller jobber i Norge.',
                )

                cy.get('.navds-tag--small.navds-tag--warning').contains('Etter dødsfall')
                cy.get('.navds-tag--small.navds-tag--warning + .navds-body-short').contains(
                    'Det blir ikke utbetalt sykepenger etter datoen for dødsfallet.',
                )

                cy.get('.navds-tag--small.navds-tag--warning').contains('Ukjent')
                cy.get('.navds-tag--small.navds-tag--warning + .navds-body-short').contains('Beskrivelse kommer...')

                cy.get('.navds-tag--small.navds-tag--warning').contains('Over 70 år')
                cy.get('.navds-tag--small.navds-tag--warning + .navds-body-short').contains(
                    'Etter at du har fylt 70 år, får du ikke sykepenger fra NAV.',
                )
            })
    })
})
