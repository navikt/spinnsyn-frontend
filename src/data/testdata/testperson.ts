import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { jsonDeepCopy } from '../../utils/json-deep-copy'

import {
    alleAvvisteDagerPerson,
    annullert,
    direkteUtenKontonummerPerson,
    diverseData,
    eldgammelt,
    etVedtakFlereArbeidsgivere,
    flexjarPoHelseHelsemetrikk,
    forLavInntektPerson,
    julesoknadPerson,
    kombinasjonPerson,
    kunArbedisgiverPerioder,
    kunDirektePerson,
    revurdertOgAnnullert,
    skjonnsfastsattRiktigAarsinntektPersona,
    skjønnsfastsattBrukerutbetalingPerson,
    skjønnsfastsattFlereArbeidsgiverePerson,
    delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomloPerson,
    avslåttFraBømloPerson,
    skjønnsfastsattRefusjonPerson,
    slutterMedDelvisRefusjon,
    under2gInntekt,
    utenData,
    vedtakMed0UtbetalingPerson,
    vedtakMedNullOmregnetAarsinngtekt,
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
    | 'null-omregnet-aarsinntekt'
    | 'avvist-fra-bomlo'
    | 'kombinasjon-delvisInnvilgelse-og-skjønnsfastsatt-fra-bomlo'

export type PersonaData = Partial<Record<PersonaKey, Persona>>

export type PersonaGroupKey = 'mottaker' | 'avvist-delvis-innvilgelse-bømlo' | 'vedtak-innhold' | 'testing'
type PersonaGroup = Record<PersonaGroupKey, PersonaData>

export const testpersonerGruppert: PersonaGroup = {
    ['mottaker']: {
        ['kun-direkte']: jsonDeepCopy(kunDirektePerson),
        ['et-vedtak-flere-arbeidsgivere']: jsonDeepCopy(etVedtakFlereArbeidsgivere),
        ['kombinasjon']: jsonDeepCopy(kombinasjonPerson),
    },
    ['avvist-delvis-innvilgelse-bømlo']: {
        ['avvist-fra-bomlo']: jsonDeepCopy(avslåttFraBømloPerson),
        ['kombinasjon-delvisInnvilgelse-og-skjønnsfastsatt-fra-bomlo']: jsonDeepCopy(
            delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomloPerson,
        ),
    },
    ['vedtak-innhold']: {
        ['alle-avviste-dager']: jsonDeepCopy(alleAvvisteDagerPerson),
        ['skjonnsfastsatt-brukerutbetaling']: jsonDeepCopy(skjønnsfastsattBrukerutbetalingPerson),
        ['skjønnsfastsatt-refusjon']: jsonDeepCopy(skjønnsfastsattRefusjonPerson),
        ['skjønnsfastsatt-flere-arbeidsgivere']: jsonDeepCopy(skjønnsfastsattFlereArbeidsgiverePerson),
        ['delvis-og-helt-avviste-vedtak']: jsonDeepCopy(forLavInntektPerson),
        ['slutter-med-delvis-refusjon']: jsonDeepCopy(slutterMedDelvisRefusjon),
        ['annulert-og-overført-infotrygd']: jsonDeepCopy(annullert),
        ['kun-ag-periode']: jsonDeepCopy(kunArbedisgiverPerioder),
        ['under-2g-beskjed']: jsonDeepCopy(under2gInntekt),
        ['julesoknad']: jsonDeepCopy(julesoknadPerson),
        ['vedtak-med-0-utbetaling']: jsonDeepCopy(vedtakMed0UtbetalingPerson),
        ['flexjar-pohelse']: jsonDeepCopy(flexjarPoHelseHelsemetrikk),
    },
    ['testing']: {
        ['uten-data']: jsonDeepCopy(utenData),
        ['diverse-data']: jsonDeepCopy(diverseData),
        ['veldig-gammelt-vedtak']: jsonDeepCopy(eldgammelt),
        ['direkte-uten-kontonummer']: jsonDeepCopy(direkteUtenKontonummerPerson),
        ['revurdert-og-annullert']: jsonDeepCopy(revurdertOgAnnullert),
        ['skjonnsfastsatt-riktig-aarsinntekt']: jsonDeepCopy(skjonnsfastsattRiktigAarsinntektPersona),
        ['null-omregnet-aarsinntekt']: jsonDeepCopy(vedtakMedNullOmregnetAarsinngtekt),
    },
}

export const testpersoner: PersonaData = Object.values(testpersonerGruppert).reduce((alle, gruppe) => {
    return { ...alle, ...gruppe }
})
