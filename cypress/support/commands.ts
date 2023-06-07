// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-real-events'

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            besok: (url: string) => void
        }
    }
}

Cypress.Commands.add('besok', (url: string) => {
    cy.visit(url, {
        onBeforeLoad(win) {
            win.document.head.appendChild(win.document.createElement('link')).rel = 'stylesheet'
            win.document.head.appendChild(win.document.createElement('link')).href =
                '/syk/sykepenger/static/disable-animations.css'
        },
    })
    cy.get('h1') // avventer at element som finnes på alle sider dukker opp
})
