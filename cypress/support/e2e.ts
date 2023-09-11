// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'
import 'cypress-axe'

before(() => {
    // Skjuler hint så den ikke ligger over andre elementer
    localStorage.setItem('devtools-hint', 'false')
    // Resetter cookies / leste vedtak før hver test
    cy.clearCookies()
})

afterEach(() => {
    if (Cypress.currentTest.titlePath[0] == 'Vedtak for arkivering') {
        cy.contains('Svaret på søknaden er vedtaket i saken din')
    } else {
        cy.get('h1') // avventer at element som finnes på alle sider dukker opp
    }
    cy.injectAxe()

    const rules = (testTittel: string) => {
        if (testTittel == 'Vedtak for arkivering') {
            // SSR rendret har noen quirks
            return {
                rules: [
                    { id: 'page-has-heading-one', enabled: false },
                    { id: 'landmark-one-main', enabled: false },
                    { id: 'region', enabled: false },
                ],
            }
        }
        return {
            // prettier-ignore
            rules: [
                { id: "svg-img-alt", enabled: false }  // Trenger ikke alt tekst på bilder
            ],
        }
    }

    cy.configureAxe(rules(Cypress.currentTest.titlePath[0]))
    cy.checkA11y(
        {
            exclude: ['.axe-exclude'],
        },
        undefined,
        terminalLog,
        false,
    )
})

function terminalLog(violations: any) {
    cy.task(
        'log',
        `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${
            violations.length === 1 ? 'was' : 'were'
        } detected`,
    )
    // pluck specific keys to keep the table readable
    const violationData = violations.map(({ id, impact, description, nodes }: any) => ({
        id,
        impact,
        description,
        nodes: nodes.length,
        nodesJsonString: JSON.stringify(nodes),
    }))

    cy.task('table', violationData)
}
