import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { kombinertDirekteOgRefusjon, kunDirekte } from './rs-vedtak'

export interface Persona {
    vedtak: RSVedtakWrapper[],
}


export const kunDirektePerson: Persona = {
    vedtak: [ kunDirekte ],
}

export const kombinasjonPerson: Persona = {
    vedtak: [ kombinertDirekteOgRefusjon ],
}
