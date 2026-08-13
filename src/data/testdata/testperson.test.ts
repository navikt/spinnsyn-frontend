import { describe, expect, it } from 'vitest'

import { STANDARD_TESTPERSON, synligeTestpersoner, testpersoner, testpersonerGruppert } from './testperson'

describe('testpersoner', () => {
    it('har standardperson og demoinfo på vedtakene', () => {
        const personer = testpersoner()
        const standardperson = personer[STANDARD_TESTPERSON]

        expect(standardperson?.beskrivelse).toBe('Arbeidstaker – alle scenarioer')
        expect(standardperson?.vedtak[0]?.demoinfo).toBe('Utbetaling: Det meste')
    })

    it('grupperer testpersonene på yrkesaktivitetstype med én persona per scenariokategori', () => {
        const grupper = testpersonerGruppert()

        expect(grupper.map((gruppe) => gruppe.tittel)).toEqual(['Arbeidstaker', 'Selvstendig næringsdrivende'])
        expect(grupper[0]?.personer.map((person) => person.nøkkel)).toEqual([
            'arbeidstaker',
            'arbeidstaker-utbetaling',
            'arbeidstaker-ingen-utbetaling',
            'arbeidstaker-avslag',
            'arbeidstaker-inntekt',
            'arbeidstaker-begrunnelse',
            'arbeidstaker-revurdering',
        ])
        expect(grupper[1]?.personer.map((person) => person.nøkkel)).toEqual([
            'selvstendig-naeringsdrivende',
            'selvstendig-utbetaling',
            'selvstendig-ingen-utbetaling',
            'selvstendig-avslag',
            'selvstendig-inntekt',
        ])
    })

    it('lar scenariopersonaene til sammen dekke alle vedtakene i gruppens samlepersona', () => {
        testpersonerGruppert().forEach((gruppe) => {
            const [samlet, ...scenarioer] = gruppe.personer
            const antallIScenarioer = scenarioer.reduce((sum, person) => sum + person.persona.vedtak.length, 0)

            expect(antallIScenarioer).toBe(samlet!.persona.vedtak.length)
        })
    })

    it('samler alle selvstendig-vedtakene i én persona med demoinfo', () => {
        const selvstendig = synligeTestpersoner()['selvstendig-naeringsdrivende']

        expect(selvstendig?.beskrivelse).toBe('Selvstendig næringsdrivende – alle scenarioer')
        expect(selvstendig?.vedtak.map((vedtak) => vedtak.demoinfo)).toEqual([
            'Utbetaling: Standard vedtak',
            'Ingen utbetaling: Ingen utbetaling',
            'Avslag: Beskjed til Nav ikke registrert',
            'Avslag: Lav inntekt',
            'Avslag: Mangler opptjening',
            'Inntekt: Redusert til 6 G',
            'Inntekt: Uten årsinntekt',
        ])
        expect(selvstendig?.vedtak.every((vedtak) => vedtak.vedtak.yrkesaktivitetstype === 'SELVSTENDIG')).toBe(true)
    })

    it('har unike demoinfo-tekster på alle vedtak i de synlige personaene', () => {
        Object.values(synligeTestpersoner()).forEach((persona) => {
            const demoinfoer = persona.vedtak.map((vedtak) => vedtak.demoinfo)

            expect(new Set(demoinfoer).size).toBe(demoinfoer.length)
        })
    })
})
