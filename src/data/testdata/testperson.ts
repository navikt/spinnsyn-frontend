import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { jsonDeepCopy } from '../../utils/json-deep-copy'

import {
    delvisAvvistVedtak,
    innvilgetVedtak,
    avvistVedtak,
    ingenVedtakPerson,
    skjønnsfastsattVedtak,
} from './data/personas/personas'

export interface Persona {
    vedtak: RSVedtakWrapper[]
    beskrivelse: string
    kontonummer?: string
    togglesOn?: string[]
    togglesOff?: string[]
}

export type PersonaKey =
    | 'uten-data'
    | 'diverse-data'
    | 'et-vedtak-flere-arbeidsgivere'
    | 'annulert-og-overført-infotrygd'
    | 'veldig-gammelt-vedtak'
    | 'delvis-og-helt-avviste-vedtak'
    | 'kun-direkte'
    | 'direkte-uten-kontonummer'
    | 'kombinasjon'
    | 'kun-ag-periode'
    | 'slutter-med-delvis-refusjon'
    | 'skjonnsfastsatt-brukerutbetaling'
    | 'skjønnsfastsatt-refusjon'
    | 'skjønnsfastsatt-flere-arbeidsgivere'
    | 'alle-avviste-dager'
    | 'revurdert-og-annullert'
    | 'under-2g-beskjed'
    | 'julesoknad'
    | 'skjonnsfastsatt-riktig-aarsinntekt'
    | 'vedtak-med-0-utbetaling'
    | 'flexjar-pohelse'
    | 'innvilget-vedtak'

export type PersonaData = Partial<Record<PersonaKey, Persona>>

export type PersonaGroupKey = 'ingen-vedtak' | 'vedtak-avslag'
type PersonaGroup = Record<PersonaGroupKey, PersonaData>

export const testpersonerGruppert: PersonaGroup = {
    ['vedtak-avslag']: {
        ['innvilget-vedtak']: jsonDeepCopy(innvilgetVedtak),
        ['alle-avviste-dager']: jsonDeepCopy(avvistVedtak),
        ['delvis-og-helt-avviste-vedtak']: jsonDeepCopy(delvisAvvistVedtak),
        ['skjonnsfastsatt-brukerutbetaling']: jsonDeepCopy(skjønnsfastsattVedtak),
    },
    ['ingen-vedtak']: {
        ['uten-data']: jsonDeepCopy(ingenVedtakPerson),
    },
}

export const testpersoner: PersonaData = Object.values(testpersonerGruppert).reduce((alle, gruppe) => {
    return { ...alle, ...gruppe }
})
