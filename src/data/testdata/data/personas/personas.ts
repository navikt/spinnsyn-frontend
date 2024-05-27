import { Persona } from '../../testperson'
import {
    avvistVedtak,
    avvistVedtakMedLavInntekt,
    avvistVedtakMedLavInntektDirekteUtbetaling,
    inntektUnder2g,
    kombinertDirekteOgRefusjon,
    kunAgPeriode,
    kunDirekte,
    slutterMedRefusjon,
    ulestGammeltVedtak,
    ulestVedtakUtenUtbetalingsdager,
    vedtakAnnullert,
    vedtakMed0Utbetaling,
    vedtakMed40Grad,
    vedtakMedDetMeste,
    vedtakRedusertTil6G,
    vedtakRevurdert,
    vedtakRevurdertDirekte,
    vedtakRevurdertKombinasjon,
} from '../vedtak/rs-vedtak'
import { vedtakMedFlereArbeidsgivere } from '../vedtak/vedtakMedFlereArbeidsgivere'
import {
    avslåttFraBømlo,
    delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo,
} from '../vedtak/delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo'
import { vedtakDerDetSluttesMedDelvisRefusjon } from '../vedtak/vedtakDerDetSluttesMedDelvisRefusjon'
import { alleAvvisteDager, alleAvvisteDagerFraBomlo } from '../vedtak/alleAvvisteDager'
import {
    skjønnsfastsattBrukerutbetaling,
    skjønnsfastsattFlereArbeidsgivere,
    skjønnsfastsattRefusjon,
} from '../vedtak/skjønnsfastsatt'
import { revurdertOgAnnullertVedtak } from '../vedtak/revurdertOgAnnullert'
import { julesoknadVedtak } from '../vedtak/julesoknad'
import { skjonnsfastsattRiktigAarsinntekt } from '../vedtak/skjonnsfastsattRiktigAarsinntekt'
import { nullOmregnetAarsinntekt } from '../vedtak/nullOmregnetAarsinntekt'

export const utenData: Persona = {
    vedtak: [],
    beskrivelse: 'Ingen vedtak fattet',
}

export const etVedtakFlereArbeidsgivere: Persona = {
    vedtak: [vedtakMedFlereArbeidsgivere],
    beskrivelse: 'Refusjon til arbeidsgiver og ansatt 2 steder',
}

export const diverseData: Persona = {
    vedtak: [
        vedtakMedDetMeste,
        vedtakMed40Grad,
        ulestVedtakUtenUtbetalingsdager,
        vedtakAnnullert,
        vedtakRevurdert,
        vedtakRevurdertDirekte,
        vedtakRevurdertKombinasjon,
        alleAvvisteDager,
        avvistVedtak,
        avvistVedtakMedLavInntekt,
        vedtakRedusertTil6G,
    ],
    beskrivelse: 'Diverse vedtak brukt til testing',
}

export const annullert: Persona = {
    vedtak: [vedtakAnnullert],
    beskrivelse: 'Annullert vedtak',
}

export const eldgammelt: Persona = {
    vedtak: [ulestGammeltVedtak],
    beskrivelse: 'Veldig gammelt vedtak',
}

export const forLavInntektPerson: Persona = {
    vedtak: [avvistVedtakMedLavInntekt, avvistVedtakMedLavInntektDirekteUtbetaling],
    beskrivelse: 'Avvist på grunn av for lav inntekt',
}

export const kunDirektePerson: Persona = {
    vedtak: [kunDirekte],
    kontonummer: '10011110011',
    beskrivelse: 'Utbetaling til sykmeldt',
}

export const delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomloPerson: Persona = {
    vedtak: [delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo],
    kontonummer: '10011110011',
    beskrivelse: 'Delvis Innvilget og Skjønnsfastsatt vedtak med refusjon og brukerutbetaling fra Bømlo',
}

export const avslåttFraBømloPerson: Persona = {
    vedtak: [avslåttFraBømlo],
    kontonummer: '10011110011',
    beskrivelse: 'Avslått vedtak uten utbetaling fra Bømlo',
}

export const flexjarPoHelseHelsemetrikk: Persona = {
    vedtak: [kunDirekte],
    kontonummer: '10011110011',
    beskrivelse: 'Viser flexjaren PO Helse helsemetrikk',
    togglesOn: ['flexjar-spinnsyn-pohelse-helsemetrikk'],
    togglesOff: ['flexjar-spinnsyn-frontend'],
}

export const julesoknadPerson: Persona = {
    vedtak: [julesoknadVedtak],
    kontonummer: '10011110011',
    beskrivelse: 'Julesøknad med advarsel',
}

export const direkteUtenKontonummerPerson: Persona = {
    vedtak: [kunDirekte],
    beskrivelse: 'Utbetaling til sykmeldt uten kontonummer',
}

export const kombinasjonPerson: Persona = {
    vedtak: [kombinertDirekteOgRefusjon, slutterMedRefusjon],
    beskrivelse: 'Både refusjon og brukerutbetaling',
}

export const slutterMedDelvisRefusjon: Persona = {
    vedtak: [vedtakDerDetSluttesMedDelvisRefusjon],
    beskrivelse: 'Arbeidsgiver slutter med refusjon midt i perioden',
}

export const kunArbedisgiverPerioder: Persona = {
    vedtak: [kunAgPeriode],
    beskrivelse: 'Vedtak som bare gjelder innenfor arbeidsgiverperioden',
}

export const skjønnsfastsattBrukerutbetalingPerson: Persona = {
    vedtak: [skjønnsfastsattBrukerutbetaling],
    beskrivelse: 'Skjønnsfastsatt inntekt med brukerutbetaling',
}

export const skjønnsfastsattRefusjonPerson: Persona = {
    vedtak: [skjønnsfastsattRefusjon],
    beskrivelse: 'Skjønnsfastsatt inntekt med refusjon til arbeidsgiver',
}

export const skjønnsfastsattFlereArbeidsgiverePerson: Persona = {
    vedtak: [skjønnsfastsattFlereArbeidsgivere],
    beskrivelse: 'Skjønnsfastsatt inntekt med refusjon og flere arbeidsforhold',
}

export const alleAvvisteDagerPerson: Persona = {
    vedtak: [alleAvvisteDager, alleAvvisteDagerFraBomlo],
    beskrivelse: 'Inneholder alle avviste dager vi har støtte for',
}

export const revurdertOgAnnullert: Persona = {
    vedtak: [revurdertOgAnnullertVedtak],
    beskrivelse: 'Vedtak som både er revurdert og senere annulert',
}

export const under2gInntekt: Persona = {
    vedtak: [inntektUnder2g],
    beskrivelse: 'Vedtak for bruker under 2g i inntekt som dermed får en ekstra beskjed',
}
export const skjonnsfastsattRiktigAarsinntektPersona: Persona = {
    vedtak: skjonnsfastsattRiktigAarsinntekt,
    beskrivelse: 'Test av skjønnsfastsatt inntekt med riktig årsinntekt',
}

export const vedtakMed0UtbetalingPerson: Persona = {
    vedtak: [vedtakMed0Utbetaling],
    beskrivelse: 'Vedtak for bruker med null i utbetaling',
}
export const vedtakMedNullOmregnetAarsinngtekt: Persona = {
    vedtak: [nullOmregnetAarsinntekt],
    beskrivelse: 'Vedtak for bruker med 0 i årsinntekt',
}
