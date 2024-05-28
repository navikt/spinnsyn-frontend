import { RSUtbetalingdag, RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { kunDirekte } from '../data/testdata/data/vedtak/kunDirekte'
import { alleAvvisteDager } from '../data/testdata/data/vedtak/alleAvvisteDager'
import { vedtakAnnullert } from '../data/testdata/data/vedtak/annullert'
import { avvistVedtakMedLavInntekt } from '../data/testdata/data/vedtak/avvistMedLavInntekt'
import { avvistVedtak } from '../data/testdata/data/vedtak/avvistVedtak'
import { avvistVedtakMedLavInntektDirekteUtbetaling } from '../data/testdata/data/vedtak/avvistVedtakMedLavInntektDirekteUtbetaling'
import { delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo } from '../data/testdata/data/vedtak/delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo'
import { vedtakMed40Grad } from '../data/testdata/data/vedtak/gradert40'
import { inntektUnder2g } from '../data/testdata/data/vedtak/inntektUnder2g'
import { julesoknadVedtak } from '../data/testdata/data/vedtak/julesoknad'

import { verifiserDaglogikk } from './verifiserDaglogikk'

describe('Verifisering av testdata', () => {
    function verifiserTestdataVedtak(vedtak: RSVedtakWrapper) {
        const prossesertVedtak = verifiserDaglogikk(vedtak)
        expect(prossesertVedtak.nyBeregning).toEqual(prossesertVedtak.opprinneligBeregning)
    }

    test('Kun direkte vedtak', () => {
        verifiserTestdataVedtak(kunDirekte)
    })

    test('Alle avviste dager', () => {
        verifiserTestdataVedtak(alleAvvisteDager)
    })

    test('Annullert', () => {
        verifiserTestdataVedtak(vedtakAnnullert)
    })

    test('avvistMedLavInntekt', () => {
        verifiserTestdataVedtak(avvistVedtakMedLavInntekt)
    })

    test('avvistVedtak', () => {
        verifiserTestdataVedtak(avvistVedtak)
    })

    test('avvistVedtakMedLavInntektDirekteUtbetaling', () => {
        verifiserTestdataVedtak(avvistVedtakMedLavInntektDirekteUtbetaling)
    })

    test('delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo', () => {
        verifiserTestdataVedtak(delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo)
    })
    test('vedtakMed40Grad', () => {
        verifiserTestdataVedtak(vedtakMed40Grad)
    })
    test('inntektUnder2g', () => {
        verifiserTestdataVedtak(inntektUnder2g)
    })
    test('julesoknadVedtak', () => {
        verifiserTestdataVedtak(julesoknadVedtak)
    })

    // eslint-disable-next-line
    function skapOgLoggUtbetalingsdager(vedtak: RSVedtakWrapper) {
        const utbetalingsdager: RSUtbetalingdag[] = []

        vedtak.dagerPerson.forEach((dag) => {
            utbetalingsdager.push({
                dato: dag.dato,
                type: dag.dagtype,
                begrunnelser: dag.begrunnelser,
            })
        })
        vedtak.dagerArbeidsgiver.forEach((dag) => {
            utbetalingsdager.push({
                dato: dag.dato,
                type: dag.dagtype,
                begrunnelser: dag.begrunnelser,
            })
        })
        const sortert = utbetalingsdager.sort((a, b) => a.dato.localeCompare(b.dato))
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(sortert, null, 2))
    }
})
