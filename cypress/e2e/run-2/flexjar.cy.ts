import { kunDirekte } from '../../../src/data/testdata/data/vedtak/kunDirekte'

describe('Flexjar', () => {
    const vedtak = kunDirekte

    before(() => {
        cy.visit('http://localhost:3000/syk/sykepenger?testperson=direkte-uten-kontonummer')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 1)
    })

    it('Laster vedtaket', () => {
        cy.url().should('equal', 'http://localhost:3000/syk/sykepenger?testperson=direkte-uten-kontonummer')
        cy.get(`a[href*=${vedtak.id}]`).click()
    })

    it('Kan gi ja feedback', () => {
        heading('Hjelp oss med å gjøre denne siden bedre', 2)
            .closest('[role="region"]')
            .within(() => {
                cy.findByRole('button', {
                    name: 'Ja',
                }).click()
                cy.findByRole('button', {
                    name: 'Ja',
                }).should('have.css', 'background-color', 'rgb(35, 38, 42)')
                cy.findByRole('textbox').type('Dette er en test')
                cy.findByRole('button', {
                    name: 'Send tilbakemelding',
                }).click()
            })
        cy.contains('Takk for tilbakemeldingen!')
    })

    it('Kan gi nei feedback', () => {
        cy.reload()
        heading('Hjelp oss med å gjøre denne siden bedre', 2)
            .closest('[role="region"]')
            .within(() => {
                cy.findByRole('button', {
                    name: 'Nei',
                }).click()
                cy.findByRole('button', {
                    name: 'Nei',
                }).should('have.css', 'background-color', 'rgb(35, 38, 42)')
                cy.findByRole('textbox').type('Dette er en test')
                cy.findByRole('button', {
                    name: 'Send tilbakemelding',
                }).click()
            })
        cy.contains('Takk for tilbakemeldingen!')
    })

    it('Har PO Helse helsemetrikk flexjar når det er riktige toggles', () => {
        cy.visit(
            'http://localhost:3000/syk/sykepenger?testperson=flexjar-pohelse&flexjar-spinnsyn-pohelse-helsemetrikk=true&flexjar-spinnsyn-frontend=false&id=348a5462-456a-4bfc-9b54-11cd77a9937f',
        )
        cy.contains('Hvordan opplevde du å søke og å få svar på søknaden om sykepenger?')
        heading('Hva synes du?', 2)
            .closest('[role="region"]')
            .within(() => {
                cy.findByRole('button', {
                    name: 'Bra',
                })
                    .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                    .click()
                cy.findByRole('button', {
                    name: 'Bra',
                }).should('have.css', 'background-color', 'rgb(236, 238, 240)')
                cy.findByRole('textbox').type('Dette er en test')
                cy.findByRole('button', {
                    name: 'Send tilbakemelding',
                }).click()
            })
        cy.contains('Takk for tilbakemeldingen!')
    })

    function heading(heading: string, level = 3) {
        return cy.get('body').findByRole('heading', {
            name: heading,
            level,
        })
    }
})
