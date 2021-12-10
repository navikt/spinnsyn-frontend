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
            .and('contain', 'Utbetales til Pengeløs Sparebank')
            .click({ force: true })

        cy.contains('Beløpet dag for dag')
            .click({ force: true })

        // Dager utenfor vedtak fom og tom
        cy.contains('21.01.21').should('not.exist')
        cy.contains('23.01.21').should('not.exist')

        // Dager innenfor vedtak fom og tom
        cy.contains('08.feb.').parent().should('contain', '40% syk').and('contain', '896')
        cy.contains('20.feb.').parent().should('contain', 'Helg').and('contain', '-')
    })

    it('Slik beregner vi sykepengene har en dagsats', () => {
        cy.contains('Slik beregner vi sykepengene')
            .click({ force: true })

        cy.get('.inntekt__info .dagsats').contains('Dagsats')
        cy.get('.inntekt__info > .dagsats').contains('2 239 kr')

        cy.contains('Redusert til 6G').should('not.exist')

        cy.contains('Flere arbeidsforhold').should('not.exist')
        cy.contains('Har du flere arbeidsforhold, og du til sammen tjener mer enn 6 G, blir reduksjonen fordelt slik at det tilsvarer forholdet mellom inntektene.').should('not.exist')
    })

    it('Forklaring', () => {
        cy.get('.utbetalingsoversikt .tekstinfo .etikett').should('have.text', 'Delvis syk' + 'Helg')
        cy.get('.utbetalingsoversikt .tekstinfo .typo-normal').should('have.text',
            'Du får sykepenger for den delen av arbeidstiden du ikke jobber. Vi bruker opplysningene du ga i søknaden, om hvor mye du jobbet i perioden.' +
            'Sykepenger betales bare for dagene mandag til fredag. Jobber du lørdager og søndager, blir disse dagene likevel regnet med i sykepengene du får. Inntekten som du har på helgedagene, blir fordelt på ukedagene.'
        )
    })

    it('Vi går tilbake til oversikten', () => {
        cy.get(':nth-child(3) > .lenke').contains('Svar på søknader').click()
    })

    it('Sjekker utbetalingsoversikt på vedtak med alle dagtyper', () => {
        cy.get(`article a[href*=${integrasjonsVedtak.id}]`).click()

        cy.get('.ekspanderbar.gronn').click()
        cy.contains('Beløpet dag for dag').click({ force: true })

        cy.get('.utbetalingsoversikt').within(() => {
            cy.contains('30.jan.').parent().should('contain', 'Arbeidsdag').and('contain', '-')
            cy.contains('31.jan.').parent().should('contain', 'Arbeidsgiveren betaler').and('contain', '-')
            cy.contains('01.feb.').parent().should('contain', 'Syk').and('contain', '1\u00a0000 kr')
            cy.contains('06.feb.').parent().should('contain', 'Helg').and('contain', '-')
            cy.contains('08.feb.').parent().should('contain', '40% syk').and('contain', '400 kr')
            cy.contains('11.feb.').parent().should('contain', 'Fridag').and('contain', '-')
            cy.contains('13.feb.').parent().should('contain', 'Søkt for sent').and('contain', '-')
            cy.contains('14.feb.').parent().should('contain', 'Ukjent').and('contain', '-')
            cy.contains('15.feb.').parent().should('contain', 'Maks antall dager').and('contain', '-')
            cy.contains('16.feb.').parent().should('contain', 'For lav inntekt').and('contain', '-')
            cy.contains('17.feb.').parent().should('contain', 'Egenmelding').and('contain', '-')
            cy.contains('18.feb.').parent().should('contain', 'Sykmeldt i for liten grad').and('contain', '-')
            cy.contains('19.feb.').parent().should('contain', 'Jobbet for kort').and('contain', '-')
            cy.contains('20.feb.').parent().should('contain', 'Ikke medlem').and('contain', '-')
            cy.contains('21.feb.').parent().should('contain', 'Etter dødsfall').and('contain', '-')
            cy.contains('22.feb.').parent().should('contain', 'Ukjent').and('contain', '-')
            cy.contains('23.feb.').parent().should('contain', 'Over 70 år').and('contain', '-')
        })

        cy.contains('Forklaring').parent().within(() => {
            cy.get('.etikett--mini.etikett--info')
                .contains('Arbeidsgiveren betaler').parent().siblings()
                .contains('Arbeidsgiveren din betaler de første 16 kalenderdagene av sykefraværet.')
            cy.get('.etikett--mini.etikett--info')
                .contains('Arbeidsdag').parent().siblings()
                .contains('Du får ikke sykepenger for hele dager du har vært på jobb. Vi bruker opplysningene du ga i søknaden, om hvor mye du jobbet.')
            cy.get('.etikett--mini.etikett--suksess')
                .contains('Syk').parent().siblings()
                .contains('Du har vært syk en hel dag, og du får sykepenger for denne dagen.')
            cy.get('.etikett--mini.etikett--info')
                .contains('Helg').parent().siblings()
                .contains('Sykepenger betales bare for dagene mandag til fredag. Jobber du lørdager og søndager, blir disse dagene likevel regnet med i sykepengene du får. Inntekten som du har på helgedagene, blir fordelt på ukedagene.')
            cy.get('.etikett--mini.etikett--suksess')
                .contains('Delvis syk').parent().siblings()
                .contains('Du får sykepenger for den delen av arbeidstiden du ikke jobber. Vi bruker opplysningene du ga i søknaden, om hvor mye du jobbet i perioden.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Fridag').parent().siblings()
                .contains('Du får ikke sykepenger for dager du har ferie eller permisjon.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Ferie').parent().siblings()
                .contains('Du har oppgitt i søknaden at du hadde ferie. I ferien stoppes sykepengene.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Søkt for sent').parent().siblings()
                .contains('Søknaden må sendes senest tre måneder etter den måneden hver enkelt sykmelding startet.')
            cy.get('.etikett--mini.etikett--info')
                .contains('Ukjent').parent().siblings()
                .contains('Vi har ikke mottatt informasjon om denne dagen, så den regnes som arbeidsdag.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Permisjon').parent().siblings()
                .contains('Du har oppgitt i søknaden at du hadde permisjon. Du får ikke sykepenger for dager du har permisjon.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Maks antall dager').parent().siblings()
                .contains('Du har fått sykepenger fra NAV i 248 dager (mandag-fredag). Det må gå 26 uker uten at du får sykepenger eller arbeidsavklaringspenger før du kan få sykepenger igjen.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('For lav inntekt').parent().siblings()
                .contains('Du har et sykepengegrunnlag på mindre enn et halvt grunnbeløp i året. Det betyr at du ikke kan få sykepenger.')
                .get('a').contains('grunnbeløp').should('have.attr', 'href', 'https://www.nav.no/no/nav-og-samfunn/kontakt-nav/utbetalinger/grunnbelopet-i-folketrygden')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Egenmelding').parent().siblings()
                .contains('Du kan ikke bruke egenmelding de dagene NAV betaler sykepenger. For de dagene må du ha sykmelding.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Sykmeldt i for liten grad').parent().siblings()
                .contains('Du må være minst 20 prosent sykmeldt for å få sykepenger.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Jobbet for kort').parent().siblings()
                .contains('Du må ha vært i arbeid i minst fire uker rett før sykefraværet, det vil si 28 dager fra og med dagen før du ble sykmeldt.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Ikke medlem').parent().siblings()
                .contains('Du må være medlem i folketrygden for å få sykepenger. Du er medlem bare hvis du bor eller jobber i Norge.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Etter dødsfall').parent().siblings()
                .contains('Det blir ikke utbetalt sykepenger etter datoen for dødsfallet.')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Ukjent').parent().siblings()
                .contains('Beskrivelse kommer...')
            cy.get('.etikett--mini.etikett--fokus')
                .contains('Over 70 år').parent().siblings()
                .contains('Etter at du har fylt 70 år, får du ikke sykepenger fra NAV.')

        })
    })
})
