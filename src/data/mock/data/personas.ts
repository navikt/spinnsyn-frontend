import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import {
    avvistVedtak, integrasjonsVedtak, kombinertDirekteOgRefusjon, kunDirekte,
    ulestGammeltVedtak, ulestVedtakUtenUtbetalingsdager, vedtakAnnullert,
    vedtakMed40Grad, vedtakMedDetMeste, vedtakRedusertTil6G,
    vedtakRevurdert, vedtakRevurdertDirekte, vedtakRevurdertKombinasjon
} from './rs-vedtak'


export interface Persona {
    vedtak: RSVedtakWrapper[],
}


export const utenData: Persona = {
    vedtak: [],
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
        vedtakRedusertTil6G,
    ],
}

export const annullert: Persona = {
    vedtak: [ vedtakAnnullert ],
}

export const eldgammelt: Persona = {
    vedtak: [ ulestGammeltVedtak ],
}

export const avvistPerson: Persona = {
    vedtak: [ integrasjonsVedtak, avvistVedtak ]
}

export const kunDirektePerson: Persona = {
    vedtak: [ kunDirekte ],
}

export const kombinasjonPerson: Persona = {
    vedtak: [ kombinertDirekteOgRefusjon ],
}
