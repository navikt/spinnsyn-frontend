import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import {
    avvistVedtak,
    integrasjonsVedtak,
    nyeVedtak,
    over6GVedtak,
    ulestGammeltVedtak,
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

export const avvistPerson: Persona = {
    soknader: soknader,
    vedtak: [ integrasjonsVedtak, avvistVedtak ]
}

export const over6GPerson: Persona = {
    soknader: soknader,
    vedtak: [ over6GVedtak ]
}
