import { integrasjonsVedtak, vedtakMed40Grad } from '../../src/data/mock/data/rs-vedtak'

describe('Tester visning av utbetalingsoversikt', () => {

    const vedtak = vedtakMed40Grad

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get(`article a[href*=${vedtak.id}]`).click()
    })

    it('Utbetalingsoversikt', () => {
        cy.contains('8 960 kroner')
            .and('contain', 'Utbetales til arbeidsgiveren')
            .click({ force: true })

        cy.contains('Daglig utbetalingsoversikt')
            .click({ force: true })

        // Dager utenfor vedtak fom og tom
        cy.contains('21.01.21').should('not.exist')
        cy.contains('23.01.21').should('not.exist')

        // Dager innenfor vedtak fom og tom
        cy.contains('08.02.21').parent().should('contain', 'Delvis syk').and('contain', '896')
        cy.contains('20.02.21').parent().should('contain', 'Helg').and('contain', '-')
    })

    it('Mer om dagtyper', () => {
        cy.get('.utbetalingsoversikt .tekstinfo .etikett').should('have.text', 'Delvis syk' + 'Helg')
        cy.get('.utbetalingsoversikt .tekstinfo .typo-normal').should('have.text',
            'Du får sykepenger for den delen av arbeidstiden du ikke jobber. Vi bruker opplysningene dine om hvor mye du jobbet i perioden.' +
            'Sykepenger betales alltid fra mandag til fredag. Om du jobber lørdager og søndager blir dette medregnet i totalbeløpet.'
        )
    })

    it('Vi går tilbake til oversikten', () => {
        cy.get(':nth-child(3) > .lenke').contains('Utbetalinger').click()
    })

    it('Sjekker utbetalingsoversikt på vedtak med alle dagtyper', () => {
        cy.get(`article a[href*=${integrasjonsVedtak.id}]`).click()

        cy.get('.utvidbar.gronn').click()
        cy.contains('Daglig utbetalingsoversikt').click({ force: true })

        cy.get('.utbetalingsoversikt').within(() => {
            cy.contains('30.01.21').parent().should('contain', 'Arbeidsdag').and('contain', '-')
            cy.contains('31.01.21').parent().should('contain', 'Arbeidsgiver betaler').and('contain', '-')
            cy.contains('01.02.21').parent().should('contain', 'Syk').and('contain', '1\u00a0000 kr')
            cy.contains('06.02.21').parent().should('contain', 'Helg').and('contain', '-')
            cy.contains('08.02.21').parent().should('contain', 'Delvis syk').and('contain', '400 kr')
            cy.contains('11.02.21').parent().should('contain', 'Fridag').and('contain', '-')
            cy.contains('13.02.21').parent().should('contain', 'Søkt for sent').and('contain', '-')
            cy.contains('14.02.21').parent().should('contain', 'Ukjent').and('contain', '-')
            cy.contains('15.02.21').parent().should('contain', 'Maks antall dager nådd').and('contain', '-')
            cy.contains('16.02.21').parent().should('contain', 'For lav inntekt').and('contain', '-')
            cy.contains('17.02.21').parent().should('contain', 'Egenmelding for sent').and('contain', '-')
            cy.contains('18.02.21').parent().should('contain', 'Sykmeldt i for liten grad').and('contain', '-')
            cy.contains('19.02.21').parent().should('contain', 'Jobbet for kort').and('contain', '-')
            cy.contains('20.02.21').parent().should('contain', 'Ikke medlem').and('contain', '-')
            cy.contains('21.02.21').parent().should('contain', 'Etter dødsfall').and('contain', '-')
            cy.contains('22.02.21').parent().should('contain', 'Ukjent').and('contain', '-')
        })

        cy.contains('Mer om dagtyper').parent().within(() => {
            cy.get('.etikett--mini.etikett--info')
                .contains('Arbeidsgiver betaler').parent().siblings()
                .contains('Arbeidsgiveren din betaler de første 16 kalenderdagene av sykefraværet.')
            cy.get('.etikett--mini.etikett--info')
                .contains('Arbeidsdag').parent().siblings()
                .contains('Det utbetales ikke sykepenger for hele dager du har vært på jobben.')
            cy.get('.etikett--mini.etikett--suksess')
                .contains('Syk').parent().siblings()
                .contains('Du har vært syk en hel dag, og du får sykepenger for denne dagen.')
            cy.get('.etikett--mini.etikett--info')
                .contains('Helg').parent().siblings()
                .contains('Sykepenger betales alltid fra mandag til fredag. Om du jobber lørdager og søndager blir dette medregnet i totalbeløpet.')
            cy.get('.etikett--mini.etikett--suksess')
                .contains('Delvis syk').parent().siblings()
                .contains('Du får sykepenger for den delen av arbeidstiden du ikke jobber. Vi bruker opplysningene dine om hvor mye du jobbet i perioden.')
            cy.get('.etikett--mini.etikett--info')
                .contains('Fridag').parent().siblings()
                .contains('Du får ikke sykepenger for dager du har ferie eller permisjon.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Søkt for sent').parent().siblings()
                .contains('Søknaden må sendes senest tre måneder etter den siste dagen i sykmeldingsperioden.')
            cy.get('.etikett--mini.etikett--info')
                .contains('Ukjent').parent().siblings()
                .contains('Vi har ikke mottatt informasjon om denne dagen, så den regnes som arbeidsdag.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Maks antall dager nådd').parent().siblings()
                .contains('Du har vært sykmeldt i mer enn 260 dager, som er det maksimale antallet dager du kan få sykepenger. Det må gå 26 uker uten sykepenger eller arbeidsavklaringspenger før du kan få sykepenger igjen.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('For lav inntekt').parent().siblings()
                .contains('Du må ha en årlig inntekt på minst et halvt grunnbeløp for å få sykepenger.')
                .get('a').should('have.attr', 'href', 'https://www.nav.no/no/nav-og-samfunn/kontakt-nav/utbetalinger/grunnbelopet-i-folketrygden')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Egenmelding for sent').parent().siblings()
                .contains('Egenmelding kan bare brukes i arbeidsgiverperioden, det vil si de første 16 dagene av sykefraværet som arbeidsgiveren betaler. Etter dette må du søke om sykepenger.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Sykmeldt i for liten grad').parent().siblings()
                .contains('Du må være minst 20 prosent sykmeldt for å få sykepenger.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Jobbet for kort').parent().siblings()
                .contains('Du må ha vært i arbeid i minst fire uker rett før sykefraværet.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Ikke medlem').parent().siblings()
                .contains('Du må være medlem i folketrygden for å få sykepenger. Du er medlem bare hvis du bor eller jobber i Norge.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Etter dødsfall').parent().siblings()
                .contains('Det blir ikke utbetalt sykepenger etter datoen for dødsfallet.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Ukjent').parent().siblings()
                .contains('Beskrivelse kommer...')

        })
    })
})
