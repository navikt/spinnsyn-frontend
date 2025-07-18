import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak-felles'
import { JaNeiVetIkke } from '../types/types'

export const harFlereArbeidsgivere = (vedtakWrapper: RSVedtakWrapper): JaNeiVetIkke => {
    const grunnlag = vedtakWrapper.vedtak.grunnlagForSykepengegrunnlagPerArbeidsgiver

    if (grunnlag) {
        const antall = Object.keys(grunnlag).length
        if (antall == 1) {
            return 'nei'
        }
        if (antall > 1) {
            return 'ja'
        }
    }
    return 'vet_ikke'
}
