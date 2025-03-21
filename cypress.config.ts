import { defineConfig } from 'cypress'

export default defineConfig({
    chromeWebSecurity: false,
    video: false,
    viewportWidth: 1440,
    viewportHeight: 900,
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            return require('./cypress/plugins/index.js')(on, config)
        },
        baseUrl: 'http://localhost:3000/',
        excludeSpecPattern: process.env.CI ? ['cypress/e2e/alle_tester.cy.ts'] : [],
        testIsolation: false,
    },
})
