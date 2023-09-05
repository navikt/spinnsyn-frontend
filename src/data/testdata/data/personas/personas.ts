import { Persona } from '../../testperson'
import {
    avvistVedtak,
    avvistVedtakMedLavInntekt,
    kombinertDirekteOgRefusjon,
    kunDirekte,
    ulestGammeltVedtak,
    ulestVedtakUtenUtbetalingsdager,
    vedtakAnnullert,
    vedtakMed40Grad,
    vedtakMedDetMeste,
    vedtakRedusertTil6G,
    vedtakRevurdert,
    vedtakRevurdertDirekte,
    vedtakRevurdertKombinasjon,
    slutterMedRefusjon,
    kunAgPeriode,
} from '../vedtak/rs-vedtak'
import { vedtakMedFlereArbeidsgivere } from '../vedtak/vedtakMedFlereArbeidsgivere'
import { vedtakDerDetSluttesMedDelvisRefusjon } from '../vedtak/vedtakDerDetSluttesMedDelvisRefusjon'
import { alleAvvisteDager } from '../vedtak/alleAvvisteDager'
import {
    skjønnsfastsattBrukerutbetaling,
    skjønnsfastsattFlereArbeidsgivere,
    skjønnsfastsattRefusjon,
} from '../vedtak/skjønnsfastsatt'

export const utenData: Persona = {
    vedtak: [],
}

export const etVedtakFlereArbeidsgivere: Persona = {
    vedtak: [vedtakMedFlereArbeidsgivere],
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
}

export const annullert: Persona = {
    vedtak: [vedtakAnnullert],
}

export const eldgammelt: Persona = {
    vedtak: [ulestGammeltVedtak],
}

export const avvistPerson: Persona = {
    vedtak: [alleAvvisteDager, avvistVedtak, avvistVedtakMedLavInntekt],
}

export const kunDirektePerson: Persona = {
    vedtak: [kunDirekte],
    kontonummer: '10011110011',
}

export const direkteUtenKontonummerPerson: Persona = {
    vedtak: [kunDirekte],
}

export const kombinasjonPerson: Persona = {
    vedtak: [kombinertDirekteOgRefusjon, slutterMedRefusjon],
}

export const slutterMedDelvisRefusjon: Persona = {
    vedtak: [vedtakDerDetSluttesMedDelvisRefusjon],
}

export const kunArbedisgiverPerioder: Persona = {
    vedtak: [kunAgPeriode],
}

export const skjønnsfastsattBrukerutbetalingPerson: Persona = {
    vedtak: [skjønnsfastsattBrukerutbetaling],
}

export const skjønnsfastsattRefusjonPerson: Persona = {
    vedtak: [skjønnsfastsattRefusjon],
}

export const skjønnsfastsattFlereArbeidsgiverePerson: Persona = {
    vedtak: [skjønnsfastsattFlereArbeidsgivere],
}

export const alleAvvisteDagerPerson: Persona = {
    vedtak: [alleAvvisteDager],
}
