import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { jsonDeepCopy } from '../../utils/json-deep-copy'

import {
    alleAvvisteDagerPerson,
    annullert,
    direkteUtenKontonummerPerson,
    diverseData,
    eldgammelt,
    etVedtakFlereArbeidsgivere,
    forLavInntektPerson,
    kombinasjonPerson,
    kunArbedisgiverPerioder,
    kunDirektePerson,
    revurdertOgAnnullert,
    skjønnsfastsattBrukerutbetalingPerson,
    skjønnsfastsattFlereArbeidsgiverePerson,
    skjønnsfastsattRefusjonPerson,
    slutterMedDelvisRefusjon,
    utenData,
} from './data/personas/personas'

export interface Persona {
    vedtak: RSVedtakWrapper[]
    beskrivelse: string
    kontonummer?: string
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
    | 'skjønnsfastsatt-brukerutbetaling'
    | 'skjønnsfastsatt-refusjon'
    | 'skjønnsfastsatt-flere-arbeidsgivere'
    | 'alle-avviste-dager'
    | 'revurdert-og-annullert'

export type PersonaData = Partial<Record<PersonaKey, Persona>>

export type PersonaGroupKey = 'mottaker' | 'vedtak-innhold' | 'testing'
type PersonaGroup = Record<PersonaGroupKey, PersonaData>

export const testpersonerGruppert: PersonaGroup = {
    ['mottaker']: {
        ['kun-direkte']: jsonDeepCopy(kunDirektePerson),
        ['et-vedtak-flere-arbeidsgivere']: jsonDeepCopy(etVedtakFlereArbeidsgivere),
        ['kombinasjon']: jsonDeepCopy(kombinasjonPerson),
    },
    ['vedtak-innhold']: {
        ['alle-avviste-dager']: jsonDeepCopy(alleAvvisteDagerPerson),
        ['skjønnsfastsatt-brukerutbetaling']: jsonDeepCopy(skjønnsfastsattBrukerutbetalingPerson),
        ['skjønnsfastsatt-refusjon']: jsonDeepCopy(skjønnsfastsattRefusjonPerson),
        ['skjønnsfastsatt-flere-arbeidsgivere']: jsonDeepCopy(skjønnsfastsattFlereArbeidsgiverePerson),
        ['delvis-og-helt-avviste-vedtak']: jsonDeepCopy(forLavInntektPerson),
        ['slutter-med-delvis-refusjon']: jsonDeepCopy(slutterMedDelvisRefusjon),
        ['annulert-og-overført-infotrygd']: jsonDeepCopy(annullert),
        ['kun-ag-periode']: jsonDeepCopy(kunArbedisgiverPerioder),
    },
    ['testing']: {
        ['uten-data']: jsonDeepCopy(utenData),
        ['diverse-data']: jsonDeepCopy(diverseData),
        ['veldig-gammelt-vedtak']: jsonDeepCopy(eldgammelt),
        ['direkte-uten-kontonummer']: jsonDeepCopy(direkteUtenKontonummerPerson),
        ['revurdert-og-annullert']: jsonDeepCopy(revurdertOgAnnullert),
    },
}

export const testpersoner: PersonaData = Object.values(testpersonerGruppert).reduce((alle, gruppe) => {
    return { ...alle, ...gruppe }
})
