import { kunDirekte } from '../../../src/data/testdata/data/vedtak/rs-vedtak'

describe('Flexjar', () => {
    const vedtak = kunDirekte

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=direkte-uten-kontonummer')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 1)
    })

    it('Laster vedtaket', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger?testperson=direkte-uten-kontonummer')
        cy.get(`a[href*=${vedtak.id}]`).click()
    })

    it('Kan gi ja feedback', () => {
        heading('Hjelp oss med å gjøre denne siden bedre')
            .closest('section')
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
                cy.contains('Takk for tilbakemeldingen din!')
            })
    })

    it('Kan gi nei feedback', () => {
        heading('Hjelp oss med å gjøre denne siden bedre')
            .closest('section')
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
                cy.contains('Takk for tilbakemeldingen din!')
            })
    })
    function heading(heading: string, level = 3) {
        return cy.get('body').findByRole('heading', {
            name: heading,
            level,
        })
    }
})
