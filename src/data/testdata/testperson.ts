import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak-felles'
import { jsonDeepCopy } from '../../utils/json-deep-copy'

import {
    alleAvvisteDagerPerson,
    annullert,
    avslåttFraBømloPerson,
    delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomloPerson,
    direkteUtenKontonummerPerson,
    diverseData,
    etVedtakFlereArbeidsgivere,
    flexjarPoHelseHelsemetrikk,
    forLavInntektPerson,
    forLavInntektPerson67,
    innvilgelseMedBegrunnelsePerson,
    innvilgelseMedTomBegrunnelsePerson,
    julesoknadPerson,
    kombinasjonPerson,
    kombinertRevurdertPersona,
    kunArbedisgiverPerioder,
    kunDirektePerson,
    revurdertOgAnnullert,
    skjonnsfastsattRiktigAarsinntektPersona,
    skjønnsfastsattBrukerutbetalingPerson,
    skjønnsfastsattFlereArbeidsgiverePersona,
    slutterMedDelvisRefusjon,
    under2gInntekt,
    utenData,
    vedtakMed0UtbetalingPerson,
    vedtakMedNullOmregnetAarsinngtekt,
} from './data/personas/personas'
import { seksGBegrensetSelvstendigPersona, standardSelvstendigPersona } from './data/personas/naringsdrivendePersonas'

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
    | 'delvis-og-helt-avviste-vedtak'
    | 'kun-direkte'
    | 'direkte-uten-kontonummer'
    | 'kombinasjon'
    | 'kun-ag-periode'
    | 'slutter-med-delvis-refusjon'
    | 'skjonnsfastsatt-brukerutbetaling'
    | 'alle-avviste-dager'
    | 'revurdert-og-annullert'
    | 'under-2g-beskjed'
    | 'julesoknad'
    | 'skjonnsfastsatt-riktig-aarsinntekt'
    | 'skjonnsfastsatt-flere-arbeidsgivere'
    | 'vedtak-med-0-utbetaling'
    | 'flexjar-pohelse'
    | 'null-omregnet-aarsinntekt'
    | 'avvist-fra-bomlo'
    | 'kombinert-revurdert'
    | 'for-lav-inntekt-67'
    | 'kombinasjon-delvisInnvilgelse-og-skjønnsfastsatt-fra-bomlo'
    | 'innvilgelse'
    | 'innvilgelse-tom-begrunnelse'
    | 'standard-selvstendig'
    | 'seks-g-begrensning'

export type PersonaData = Partial<Record<PersonaKey, Persona>>

export type PersonaGroupKey =
    | 'mottaker'
    | 'selvstendig-naeringsdrivende'
    | 'avvist-delvis-innvilgelse-bømlo'
    | 'vedtak-innhold'
    | 'testing'
type PersonaGroup = Record<PersonaGroupKey, PersonaData>

export const testpersonerGruppert: PersonaGroup = {
    ['mottaker']: {
        ['kun-direkte']: jsonDeepCopy(kunDirektePerson),
        ['et-vedtak-flere-arbeidsgivere']: jsonDeepCopy(etVedtakFlereArbeidsgivere),
        ['kombinasjon']: jsonDeepCopy(kombinasjonPerson),
    },
    ['selvstendig-naeringsdrivende']: {
        ['standard-selvstendig']: jsonDeepCopy(standardSelvstendigPersona),
        ['seks-g-begrensning']: jsonDeepCopy(seksGBegrensetSelvstendigPersona),
    },
    ['avvist-delvis-innvilgelse-bømlo']: {
        ['avvist-fra-bomlo']: jsonDeepCopy(avslåttFraBømloPerson),
        ['for-lav-inntekt-67']: jsonDeepCopy(forLavInntektPerson67),
        ['innvilgelse']: jsonDeepCopy(innvilgelseMedBegrunnelsePerson),
        ['innvilgelse-tom-begrunnelse']: jsonDeepCopy(innvilgelseMedTomBegrunnelsePerson),
        ['kombinasjon-delvisInnvilgelse-og-skjønnsfastsatt-fra-bomlo']: jsonDeepCopy(
            delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomloPerson,
        ),
    },
    ['vedtak-innhold']: {
        ['alle-avviste-dager']: jsonDeepCopy(alleAvvisteDagerPerson),
        ['skjonnsfastsatt-brukerutbetaling']: jsonDeepCopy(skjønnsfastsattBrukerutbetalingPerson),
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
        ['direkte-uten-kontonummer']: jsonDeepCopy(direkteUtenKontonummerPerson),
        ['revurdert-og-annullert']: jsonDeepCopy(revurdertOgAnnullert),
        ['skjonnsfastsatt-riktig-aarsinntekt']: jsonDeepCopy(skjonnsfastsattRiktigAarsinntektPersona),
        ['skjonnsfastsatt-flere-arbeidsgivere']: jsonDeepCopy(skjønnsfastsattFlereArbeidsgiverePersona),
        ['null-omregnet-aarsinntekt']: jsonDeepCopy(vedtakMedNullOmregnetAarsinngtekt),
        ['kombinert-revurdert']: jsonDeepCopy(kombinertRevurdertPersona),
    },
}

export const testpersoner: PersonaData = Object.values(testpersonerGruppert).reduce((alle, gruppe) => {
    return { ...alle, ...gruppe }
})
