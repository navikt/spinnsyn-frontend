import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import {
    nyeVedtak, ulestGammeltVedtak,
    vedtakAnnullert,
} from './rs-vedtak'
import { soknader } from './soknader'


export interface Persona {
    soknader: RSSoknad[],
    vedtak: RSVedtakWrapper[],
}


export const utenData: Persona = {
    soknader: [],
    vedtak: [],
}

export const diverseData: Persona = {
    soknader: soknader,
    vedtak: nyeVedtak,
}

export const annullert: Persona = {
    soknader: soknader,
    vedtak: [ vedtakAnnullert ],
}

export const eldgammelt: Persona = {
    soknader: soknader,
    vedtak: [ ulestGammeltVedtak ],
}
