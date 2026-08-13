import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'
import { jsonDeepCopy } from '../../../../utils/json-deep-copy'

/**
 * Kategoriene speiler komponentene som faktisk varierer på vedtakssiden, slik at
 * det er enkelt å finne et demovedtak for scenarioet man jobber med.
 */
export type Scenariokategori = 'utbetaling' | 'ingen-utbetaling' | 'avslag' | 'inntekt' | 'begrunnelse' | 'revurdering'

export const scenariokategorier: Scenariokategori[] = [
    'utbetaling',
    'ingen-utbetaling',
    'avslag',
    'inntekt',
    'begrunnelse',
    'revurdering',
]

export const kategoritekst: Record<Scenariokategori, string> = {
    utbetaling: 'Utbetaling',
    'ingen-utbetaling': 'Ingen utbetaling',
    avslag: 'Avslag',
    inntekt: 'Inntekt',
    begrunnelse: 'Begrunnelse',
    revurdering: 'Revurdering',
}

export type Scenario = [Scenariokategori, string, RSVedtakWrapper]

export function tilDemovedtak(scenarioer: Scenario[]): RSVedtakWrapper[] {
    return scenarioer.map(([kategori, beskrivelse, vedtak]) => ({
        ...jsonDeepCopy(vedtak),
        demoinfo: `${kategoritekst[kategori]}: ${beskrivelse}`,
    }))
}

export function iKategori(scenarioer: Scenario[], kategori: Scenariokategori): Scenario[] {
    return scenarioer.filter(([scenariokategori]) => scenariokategori === kategori)
}
