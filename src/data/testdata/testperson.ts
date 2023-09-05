import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { jsonDeepCopy } from '../../utils/json-deep-copy'

import {
    alleAvvisteDagerPerson,
    annullert,
    avvistPerson,
    direkteUtenKontonummerPerson,
    diverseData,
    eldgammelt,
    etVedtakFlereArbeidsgivere,
    kombinasjonPerson,
    kunArbedisgiverPerioder,
    kunDirektePerson,
    skjønnsfastsattBrukerutbetalingPerson,
    skjønnsfastsattFlereArbeidsgiverePerson,
    skjønnsfastsattRefusjonPerson,
    slutterMedDelvisRefusjon,
    utenData,
} from './data/personas/personas'

export interface Persona {
    vedtak: RSVedtakWrapper[]
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

export type PersonaData = Partial<Record<PersonaKey, Persona>>

export type PersonaGroupKey = 'blanding'
type PersonaGroup = Record<PersonaGroupKey, PersonaData>

export const testpersonerGruppert: PersonaGroup = {
    ['blanding']: {
        ['uten-data']: jsonDeepCopy(utenData),
        ['diverse-data']: jsonDeepCopy(diverseData),
        ['et-vedtak-flere-arbeidsgivere']: jsonDeepCopy(etVedtakFlereArbeidsgivere),
        ['annulert-og-overført-infotrygd']: jsonDeepCopy(annullert),
        ['veldig-gammelt-vedtak']: jsonDeepCopy(eldgammelt),
        ['delvis-og-helt-avviste-vedtak']: jsonDeepCopy(avvistPerson),
        ['kun-direkte']: jsonDeepCopy(kunDirektePerson),
        ['direkte-uten-kontonummer']: jsonDeepCopy(direkteUtenKontonummerPerson),
        ['kombinasjon']: jsonDeepCopy(kombinasjonPerson),
        ['kun-ag-periode']: jsonDeepCopy(kunArbedisgiverPerioder),
        ['slutter-med-delvis-refusjon']: jsonDeepCopy(slutterMedDelvisRefusjon),
        ['skjønnsfastsatt-brukerutbetaling']: jsonDeepCopy(skjønnsfastsattBrukerutbetalingPerson),
        ['skjønnsfastsatt-refusjon']: jsonDeepCopy(skjønnsfastsattRefusjonPerson),
        ['skjønnsfastsatt-flere-arbeidsgivere']: jsonDeepCopy(skjønnsfastsattFlereArbeidsgiverePerson),
        ['alle-avviste-dager']: jsonDeepCopy(alleAvvisteDagerPerson),
    },
}

export const testpersoner: PersonaData = Object.values(testpersonerGruppert).reduce((alle, gruppe) => {
    return { ...alle, ...gruppe }
})
