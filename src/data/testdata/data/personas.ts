import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'

import {
    avvistVedtak,
    avvistVedtakMedLavInntekt,
    integrasjonsVedtak,
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
} from './rs-vedtak'
import { vedtakMedFlereArbeidsgivere } from './vedtakMedFlereArbeidsgivere'

export interface Persona {
    vedtak: RSVedtakWrapper[]
    kontonummer?: string
}

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
        integrasjonsVedtak,
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
    vedtak: [integrasjonsVedtak, avvistVedtak, avvistVedtakMedLavInntekt],
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
