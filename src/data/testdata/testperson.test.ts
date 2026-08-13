import { describe, expect, it } from 'vitest'

import { STANDARD_TESTPERSON, synligeTestpersoner, testpersoner } from './testperson'

describe('testpersoner', () => {
    it('har standardperson og demoinfo på vedtakene', () => {
        const personer = testpersoner()
        const standardperson = personer[STANDARD_TESTPERSON]

        expect(standardperson?.beskrivelse).toBe('Arbeidstaker')
        expect(standardperson?.vedtak[0]?.demoinfo).toBe('Utbetaling: Det meste')
    })

    it('har én synlig testperson per yrkesaktivitetstype', () => {
        expect(Object.keys(synligeTestpersoner())).toEqual(['arbeidstaker', 'selvstendig-naeringsdrivende'])
    })

    it('samler alle selvstendig-vedtakene i én persona med demoinfo', () => {
        const selvstendig = synligeTestpersoner()['selvstendig-naeringsdrivende']

        expect(selvstendig?.beskrivelse).toBe('Selvstendig næringsdrivende')
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
