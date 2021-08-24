import dayjs from 'dayjs'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { erHelg, tilLesbarDatoMedArstall } from './dato-utils'

export const klagefrist = (vedtakWrapper?: RSVedtakWrapper) => {
    return tilLesbarDatoMedArstall(
        dayjs(vedtakWrapper?.opprettet)
            .add(42, 'day')
            .toDate()
    )
}

export const estimertSluttdato = (vedtakWrapper?: RSVedtakWrapper) => {
    let slutt = dayjs(vedtakWrapper!.vedtak.tom)
    let x = 0
    while (x < vedtakWrapper!.vedtak.utbetaling.gjenståendeSykedager) {
        slutt = slutt.add(1, 'day')
        while (erHelg(slutt.toDate())) {
            slutt = slutt.add(1, 'day')
        }
        x++
    }
    return slutt.format('D. MMM YYYY')
}
