import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import {
    avvistVedtak,
    integrasjonsVedtak,
    nyeVedtak,
    ulestGammeltVedtak,
    vedtakAnnullert,
} from './rs-vedtak'


export interface Persona {
    vedtak: RSVedtakWrapper[],
}


export const utenData: Persona = {
    vedtak: [],
}

export const diverseData: Persona = {
    vedtak: nyeVedtak,
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
