import { Persona } from '../../testperson'
import {
    avvistVedtak,
    avvistVedtakMedLavInntekt, inntektUnder2g,
    kombinertDirekteOgRefusjon,
    kunAgPeriode,
    kunDirekte,
    slutterMedRefusjon,
    ulestGammeltVedtak,
    ulestVedtakUtenUtbetalingsdager,
    vedtakAnnullert,
    vedtakMed40Grad,
    vedtakMedDetMeste,
    vedtakRedusertTil6G,
    vedtakRevurdert,
    vedtakRevurdertDirekte,
    vedtakRevurdertKombinasjon,
} from '../vedtak/rs-vedtak'
import { vedtakMedFlereArbeidsgivere } from '../vedtak/vedtakMedFlereArbeidsgivere'
import { vedtakDerDetSluttesMedDelvisRefusjon } from '../vedtak/vedtakDerDetSluttesMedDelvisRefusjon'
import { alleAvvisteDager } from '../vedtak/alleAvvisteDager'
import {
    skjønnsfastsattBrukerutbetaling,
    skjønnsfastsattFlereArbeidsgivere,
    skjønnsfastsattRefusjon,
} from '../vedtak/skjønnsfastsatt'
import { revurdertOgAnnullertVedtak } from '../vedtak/revurdertOgAnnullert'

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
    vedtak: [avvistVedtakMedLavInntekt],
    beskrivelse: 'Avvist på grunn av for lav inntekt',
}

export const kunDirektePerson: Persona = {
    vedtak: [kunDirekte],
    kontonummer: '10011110011',
    beskrivelse: 'Utbetaling til sykmeldt',
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
    vedtak: [alleAvvisteDager],
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
