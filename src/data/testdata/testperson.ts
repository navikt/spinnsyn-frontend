import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak-felles'
import { jsonDeepCopy } from '../../utils/json-deep-copy'

import {
    alleAvvisteDagerPerson,
    annullert,
    avslåttFraBømloPerson,
    delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomloPerson,
    direkteUtenKontonummerPerson,
    etVedtakFlereArbeidsgivere,
    flexjarPoHelseHelsemetrikk,
    forLavInntektPerson,
    forLavInntektPerson67,
    innvilgelseMedBegrunnelsePerson,
    innvilgelseMedTomBegrunnelsePerson,
    innvilgelsePerson,
    julesoknadPerson,
    kombinasjonPerson,
    refusjonOgBrukerutbetalinOgDelvisInnvilget,
    kombinertRevurdertPersona,
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
    ingenUtbetalingKunHelg,
    ingenUtbetalingKunArbeidsgiverperiode,
    ingenUtbetalingArbeidsgiverperiodeOgHelg,
    arbeidstakerPerson,
} from './data/personas/personas'
import {
    ingenUtbetalingSelvstendigPersona,
    seksGBegrensetSelvstendigPersona,
    standardSelvstendigPersona,
    utenAarsinntektSelvstendigPersona,
    avslattMeldingTilNavDagPersona,
    medForsikringPersona,
    selvstendigMedLavInntektPersona,
    selvstendigMedManglerOpptjeningPersona,
    selvstendigNaeringsdrivendePerson,
} from './data/personas/naringsdrivendePersonas'

export interface Persona {
    vedtak: RSVedtakWrapper[]
    beskrivelse: string
    kontonummer?: string
    togglesOn?: string[]
    togglesOff?: string[]
}

export type PersonaKey =
    | 'arbeidstaker'
    | 'selvstendig-naeringsdrivende'
    | 'uten-data'
    | 'diverse-data'
    | 'et-vedtak-flere-arbeidsgivere'
    | 'annulert-og-overført-infotrygd'
    | 'delvis-og-helt-avviste-vedtak'
    | 'kun-direkte'
    | 'direkte-uten-kontonummer'
    | 'kombinasjon'
    | 'kombinasjonDelvis'
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
    | 'innvilgelse-med-begrunnelse'
    | 'innvilgelse-tom-begrunnelse'
    | 'standard-selvstendig'
    | 'med-forsikring'
    | 'seks-g-begrensning'
    | 'uten-aarsintekt'
    | 'ingen-utbetaling-selvstendig'
    | 'avslaatt-melding-til-nav'
    | 'selvstendig-med-lav-inntekt'
    | 'selvstendig-med-mangler-opptjening'
    | 'ingen-utbetaling-kun-helg'
    | 'ingen-utbetaling-kun-arbeidsgiverperiode'
    | 'ingen-utbetaling-arbeidsgiverperiode-og-helg'

export type PersonaData = Partial<Record<PersonaKey, Persona>>

export const STANDARD_TESTPERSON: PersonaKey = 'arbeidstaker'

export function synligeTestpersoner(): PersonaData {
    return {
        ['arbeidstaker']: jsonDeepCopy(arbeidstakerPerson),
        ['selvstendig-naeringsdrivende']: jsonDeepCopy(selvstendigNaeringsdrivendePerson),
    }
}

function skjultePersoner(): PersonaData {
    return {
        ['diverse-data']: jsonDeepCopy(arbeidstakerPerson),
        ['avvist-fra-bomlo']: jsonDeepCopy(avslåttFraBømloPerson),
        ['annulert-og-overført-infotrygd']: jsonDeepCopy(annullert),
        ['delvis-og-helt-avviste-vedtak']: jsonDeepCopy(forLavInntektPerson),
        ['direkte-uten-kontonummer']: jsonDeepCopy(direkteUtenKontonummerPerson),
        ['et-vedtak-flere-arbeidsgivere']: jsonDeepCopy(etVedtakFlereArbeidsgivere),
        ['for-lav-inntekt-67']: jsonDeepCopy(forLavInntektPerson67),
        ['ingen-utbetaling-kun-arbeidsgiverperiode']: jsonDeepCopy(ingenUtbetalingKunArbeidsgiverperiode),
        ['ingen-utbetaling-kun-helg']: jsonDeepCopy(ingenUtbetalingKunHelg),
        ['ingen-utbetaling-arbeidsgiverperiode-og-helg']: jsonDeepCopy(ingenUtbetalingArbeidsgiverperiodeOgHelg),
        ['seks-g-begrensning']: jsonDeepCopy(seksGBegrensetSelvstendigPersona),
        ['uten-aarsintekt']: jsonDeepCopy(utenAarsinntektSelvstendigPersona),
        ['ingen-utbetaling-selvstendig']: jsonDeepCopy(ingenUtbetalingSelvstendigPersona),
        ['avslaatt-melding-til-nav']: jsonDeepCopy(avslattMeldingTilNavDagPersona),
        ['standard-selvstendig']: jsonDeepCopy(standardSelvstendigPersona),
        ['med-forsikring']: jsonDeepCopy(medForsikringPersona),
        ['selvstendig-med-lav-inntekt']: jsonDeepCopy(selvstendigMedLavInntektPersona),
        ['selvstendig-med-mangler-opptjening']: jsonDeepCopy(selvstendigMedManglerOpptjeningPersona),
        ['julesoknad']: jsonDeepCopy(julesoknadPerson),
        ['under-2g-beskjed']: jsonDeepCopy(under2gInntekt),
        ['skjonnsfastsatt-brukerutbetaling']: jsonDeepCopy(skjønnsfastsattBrukerutbetalingPerson),
        ['skjonnsfastsatt-riktig-aarsinntekt']: jsonDeepCopy(skjonnsfastsattRiktigAarsinntektPersona),
        ['skjonnsfastsatt-flere-arbeidsgivere']: jsonDeepCopy(skjønnsfastsattFlereArbeidsgiverePersona),
        ['flexjar-pohelse']: jsonDeepCopy(flexjarPoHelseHelsemetrikk),
        ['alle-avviste-dager']: jsonDeepCopy(alleAvvisteDagerPerson),
        ['vedtak-med-0-utbetaling']: jsonDeepCopy(vedtakMed0UtbetalingPerson),
        ['null-omregnet-aarsinntekt']: jsonDeepCopy(vedtakMedNullOmregnetAarsinngtekt),
        ['innvilgelse']: jsonDeepCopy(innvilgelsePerson),
        ['innvilgelse-med-begrunnelse']: jsonDeepCopy(innvilgelseMedBegrunnelsePerson),
        ['innvilgelse-tom-begrunnelse']: jsonDeepCopy(innvilgelseMedTomBegrunnelsePerson),
        ['kombinasjon']: jsonDeepCopy(kombinasjonPerson),
        ['kombinasjonDelvis']: jsonDeepCopy(refusjonOgBrukerutbetalinOgDelvisInnvilget),
        ['kombinert-revurdert']: jsonDeepCopy(kombinertRevurdertPersona),
        ['kun-direkte']: jsonDeepCopy(kunDirektePerson),
        ['revurdert-og-annullert']: jsonDeepCopy(revurdertOgAnnullert),
        ['slutter-med-delvis-refusjon']: jsonDeepCopy(slutterMedDelvisRefusjon),
        ['kombinasjon-delvisInnvilgelse-og-skjønnsfastsatt-fra-bomlo']: jsonDeepCopy(
            delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomloPerson,
        ),
        ['uten-data']: jsonDeepCopy(utenData),
    }
}

export function testpersoner(): PersonaData {
    const alle: PersonaData = { ...synligeTestpersoner(), ...skjultePersoner() }

    const medDemoinfo = Object.fromEntries(
        Object.entries(alle).map(([nøkkel, person]) => [
            nøkkel,
            {
                ...person,
                vedtak: person.vedtak.map((vedtak) => ({
                    ...vedtak,
                    demoinfo: vedtak.demoinfo ?? person.beskrivelse,
                })),
            },
        ]),
    ) as PersonaData

    return medDemoinfo
}
