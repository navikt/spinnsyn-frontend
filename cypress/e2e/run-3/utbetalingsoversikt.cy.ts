import { alleAvvisteDager } from '../../../src/data/testdata/data/vedtak/alleAvvisteDager'
import { vedtakMed40Grad } from '../../../src/data/testdata/data/vedtak/gradert40'

describe('Utbetalingsoversikt', () => {
    const vedtak = vedtakMed40Grad

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 9)
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get(`a[href*=${vedtak.id}]`).click()
    })

    it('Utbetalingsoversikt', () => {
        cy.contains('8 960 kroner').parent().contains('Utbetales til Pengeløs Sparebank')

        cy.contains('Dine sykepenger per dag').click({ force: true })

        // Dager utenfor vedtak fom og tom
        cy.contains('21.01.21').should('not.exist')
        cy.contains('23.01.21').should('not.exist')

        // Dager innenfor vedtak fom og tom
        cy.contains('08.feb.').parent().parent().should('contain', '40 % syk').and('contain', '896')
        cy.contains('20.feb.').parent().parent().should('contain', 'Helg').and('contain', '-')
    })

    it('Mer om beregningen har riktig sykepengegrunnlag', () => {
        cy.get('main').findByRole('region', { name: 'Beregning av sykepengene' }).click()
        cy.contains('Mer om beregningen').click({ force: true })

        cy.contains('Sykepengegrunnlag').siblings().contains('582 161 kr')

        cy.contains('Flere arbeidsforhold').should('not.exist')
        cy.contains(
            'Har du flere arbeidsforhold, og du til sammen tjener mer enn 6 G, ' +
                'blir reduksjonen fordelt slik at det tilsvarer forholdet mellom inntektene.',
        ).should('not.exist')
    })

    it('Forklaring', () => {
        cy.get('[data-cy="dagtabell-forklaring"] .navds-tag').should('have.text', 'Delvis\u00a0syk' + 'Helg')

        cy.get('[data-cy="dagtabell-forklaring"]').children('.navds-heading').should('have.text', 'Forklaring')
        cy.get('[data-cy="dagtabell-forklaring"]')
            .find('.navds-body-short')
            .eq(1)
            .should(
                'have.text',
                'Du får sykepenger for den delen av arbeidstiden du ikke jobber. Vi bruker opplysningene du ga i søknaden, om hvor mye du jobbet i perioden.',
            )
        cy.get('[data-cy="dagtabell-forklaring"]')
            .find('.navds-body-short')
            .eq(3)
            .should(
                'have.text',
                'Sykepenger betales bare for dagene mandag til fredag. Jobber du lørdager og søndager, blir disse dagene likevel regnet med i sykepengene du får. Inntekten som du har på helgedagene, blir fordelt på ukedagene.',
            )
    })

    it('Sjekker utbetalingsoversikt på vedtak med alle dagtyper', () => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.findByRole('heading', { level: 1 }).should('be.visible').contains('Svar på søknader')

        cy.get(`a[href*=${alleAvvisteDager.id}]`).click()
        cy.get('main').findByRole('region', { name: 'Beregning av sykepengene' }).click()

        cy.contains('Dine sykepenger per dag').click({ force: true })

        cy.get('[data-cy="dag-tabell-body"]')
            .first()
            .within(() => {
                cy.contains('30.jan.').parent().parent().should('contain', 'Ikke sykmeldt').and('contain', '-')
                cy.contains('31.jan.').parent().parent().should('contain', 'Helg').and('contain', '-')
                cy.contains('01.feb.').parent().parent().should('contain', 'Syk').and('contain', '1\u00a0000 kr')
                cy.contains('06.feb.').parent().parent().should('contain', 'Helg').and('contain', '-')
                cy.contains('08.feb.').parent().parent().should('contain', '40 % syk').and('contain', '400 kr')
                cy.contains('11.feb.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('13.feb.')
                    .parent()
                    .parent()
                    .should('contain', 'Søkt\u00a0for\u00a0sent')
                    .and('contain', '-')
                cy.contains('14.feb.').parent().parent().should('contain', 'Ukjent').and('contain', '-')
                cy.contains('15.feb.')
                    .parent()
                    .parent()
                    .should('contain', 'Maks\u00a0antall\u00a0dager')
                    .and('contain', '-')
                cy.contains('16.feb.')
                    .parent()
                    .parent()
                    .should('contain', 'For\u00a0lav\u00a0inntekt')
                    .and('contain', '-')
                cy.contains('17.feb.').parent().parent().should('contain', 'Egenmelding').and('contain', '-')
                cy.contains('18.feb.')
                    .parent()
                    .parent()
                    .should('contain', 'Sykmeldt\u00a0i\u00a0for\u00a0liten\u00a0grad')
                    .and('contain', '-')
                cy.contains('19.feb.')
                    .parent()
                    .parent()
                    .should('contain', 'Jobbet\u00a0for\u00a0kort')
                    .and('contain', '-')
                cy.contains('20.feb.').parent().parent().should('contain', 'Ikke\u00a0medlem').and('contain', '-')
                cy.contains('21.feb.').parent().parent().should('contain', 'Etter\u00a0dødsfall').and('contain', '-')
                cy.contains('22.feb.').parent().parent().should('contain', 'Ukjent').and('contain', '-')
                cy.contains('23.feb.').parent().parent().should('contain', 'Over\u00a070\u00a0år').and('contain', '-')
            })

        cy.contains('Forklaring')
            .parent()
            .within(() => {
                cy.get('[data-cy="dag-label-ArbeidsgiverperiodeDag"]').contains('Arbeidsgiveren betaler')
                cy.get('[data-cy="dag-beskrivelse-ArbeidsgiverperiodeDag"]').contains(
                    'Arbeidsgiveren din betaler de første 16 kalenderdagene av sykefraværet.',
                )

                cy.get('[data-cy="dag-label-Arbeidsdag"]').contains('Ikke sykmeldt')
                cy.get('[data-cy="dag-beskrivelse-Arbeidsdag"]').contains(
                    'Du får ikke sykepenger for dager du ikke har brukt sykmeldingen.',
                )

                cy.get('[data-cy="dag-label-NavDagSyk"]').contains('Syk')
                cy.get('[data-cy="dag-beskrivelse-NavDagSyk"]').contains(
                    'Du har vært syk en hel dag, og du får sykepenger for denne dagen.',
                )

                cy.get('[data-cy="dag-label-NavHelgDag"]').contains('Helg')
                cy.get('[data-cy="dag-beskrivelse-NavHelgDag"]').contains(
                    'Sykepenger betales bare for dagene mandag til fredag. ' +
                        'Jobber du lørdager og søndager, blir disse dagene likevel regnet med i sykepengene du får. ' +
                        'Inntekten som du har på helgedagene, blir fordelt på ukedagene.',
                )

                cy.get('[data-cy="dag-label-NavDagDelvisSyk"]').contains('Delvis syk')
                cy.get('[data-cy="dag-beskrivelse-NavDagDelvisSyk"]').contains(
                    'Du får sykepenger for den delen av arbeidstiden du ikke jobber. ' +
                        'Vi bruker opplysningene du ga i søknaden, om hvor mye du jobbet i perioden.',
                )

                cy.get('[data-cy="dag-label-Fridag"]').contains('Fridag')
                cy.get('[data-cy="dag-beskrivelse-Fridag"]').contains(
                    'Du får ikke sykepenger for dager du har ferie eller permisjon.',
                )

                cy.get('[data-cy="dag-label-Feriedag"]').contains('Ferie')
                cy.get('[data-cy="dag-beskrivelse-Feriedag"]').contains(
                    'Du eller arbeidsgiveren din har oppgitt at du hadde ferie. Du får ikke sykepenger fra NAV for dager du har ferie',
                )

                cy.get('[data-cy="dag-label-ForeldetDag"]').contains('Søkt for sent')
                cy.get('[data-cy="dag-beskrivelse-ForeldetDag"]').contains(
                    'Du kan bare få sykepenger opptil tre måneder før den måneden du sendte søknaden',
                )

                cy.get('[data-cy="dag-label-UkjentDag"]').contains('Ukjent')
                cy.get('[data-cy="dag-beskrivelse-UkjentDag"]').contains(
                    'Vi har ikke mottatt informasjon om denne dagen, så den regnes som arbeidsdag.',
                )

                cy.get('[data-cy="dag-label-Permisjonsdag"]').contains('Permisjon')
                cy.get('[data-cy="dag-beskrivelse-Permisjonsdag"]').contains(
                    'Du eller arbeidsgiveren din har oppgitt at du hadde permisjon. Du får ikke sykepenger fra NAV for dager du har permisjon',
                )

                cy.get('[data-cy="dag-label-SykepengedagerOppbrukt"]').contains('Maks antall dager')
                cy.get('[data-cy="dag-beskrivelse-SykepengedagerOppbrukt"]').contains(
                    'Du har fått sykepenger fra NAV i 248 dager (mandag-fredag). ' +
                        'Det må gå 26 uker uten at du får sykepenger eller arbeidsavklaringspenger før du kan få sykepenger igjen.',
                )

                cy.get('[data-cy="dag-label-MinimumInntekt"]').contains('For lav inntekt')
                cy.get('[data-cy="dag-beskrivelse-MinimumInntekt"]')
                    .contains(
                        'Du har et sykepengegrunnlag på mindre enn et halvt grunnbeløp i året. ' +
                            'Det betyr at du ikke kan få sykepenger,',
                    )
                    .get('a')
                    .contains('grunnbeløp')
                    .should('have.attr', 'href', 'https://www.nav.no/grunnbelopet')

                cy.get('[data-cy="dag-label-EgenmeldingUtenforArbeidsgiverperiode"]').contains('Egenmelding')
                cy.get('[data-cy="dag-beskrivelse-EgenmeldingUtenforArbeidsgiverperiode"]').contains(
                    'Du kan ikke bruke egenmelding de dagene NAV betaler sykepenger. ',
                )

                cy.get('[data-cy="dag-label-MinimumSykdomsgrad"]').contains('Sykmeldt i for liten grad')
                cy.get('[data-cy="dag-beskrivelse-MinimumSykdomsgrad"]').contains(
                    'Du har oppgitt at du har jobbet mer enn sykmeldingsgraden i sykmeldingen. Du må være minst 20 prosent borte fra jobb på grunn av sykdom eller skade for å få sykepenger',
                )

                cy.get('[data-cy="dag-label-ManglerOpptjening"]').contains('Jobbet for kort')
                cy.get('[data-cy="dag-beskrivelse-ManglerOpptjening"]').contains(
                    'Du må ha vært i arbeid i minst fire uker rett før sykefraværet, ' +
                        'det vil si 28 dager fra og med dagen før du ble sykmeldt.',
                )

                cy.get('[data-cy="dag-label-ManglerMedlemskap"]').contains('Ikke medlem')
                cy.get('[data-cy="dag-beskrivelse-ManglerMedlemskap"]').contains(
                    'Du må være medlem i folketrygden for å få sykepenger. ' +
                        'Du er medlem bare hvis du bor eller jobber i Norge.',
                )

                cy.get('[data-cy="dag-label-EtterDødsdato"]').contains('Etter dødsfall')
                cy.get('[data-cy="dag-beskrivelse-EtterDødsdato"]').contains(
                    'Det blir ikke utbetalt sykepenger etter datoen for dødsfallet.',
                )

                cy.get('[data-cy="dag-label-UKJENT"]').contains('Ukjent')
                cy.get('[data-cy="dag-beskrivelse-UKJENT"]').contains('Beskrivelse kommer...')

                cy.get('[data-cy="dag-label-Over70"]').contains('Over 70 år')
                cy.get('[data-cy="dag-beskrivelse-Over70"]').contains(
                    'Etter at du har fylt 70 år, får du ikke sykepenger fra NAV',
                )
            })
    })
})
