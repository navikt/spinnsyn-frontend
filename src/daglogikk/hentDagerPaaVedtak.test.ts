import { describe, expect, test } from 'vitest'

import { refusjon } from '../data/testdata/data/vedtak/utbetalingsdager-med-grad/refusjon'

import { hentDagerPaaVedtak, validerNyUtbetalingsdagListe } from './hentDagerPaaVedtak'

describe('Hent dager på vedtak', () => {
    test('Detaljer på dager skal være lik med ny og gammel utregning', () => {
        const vedtak = hentDagerPaaVedtak(refusjon)
        if (vedtak.vedtak.utbetaling.utbetalingsdager) {
            const likeDagerArbeidsgiver = validerNyUtbetalingsdagListe(
                vedtak.vedtak.utbetaling.utbetalingsdager,
                vedtak.dagerArbeidsgiver,
            )
            expect(likeDagerArbeidsgiver).toBe(true)
            const likeDagerPerson = validerNyUtbetalingsdagListe(
                vedtak.vedtak.utbetaling.utbetalingsdager,
                vedtak.dagerPerson,
            )
            expect(likeDagerPerson).toBe(true)
        }
    })
})
