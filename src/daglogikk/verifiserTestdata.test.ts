import { RSUtbetalingdag, RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { kunDirekte } from '../data/testdata/data/vedtak/kunDirekte'
import { alleAvvisteDager } from '../data/testdata/data/vedtak/alleAvvisteDager'
import { vedtakAnnullert } from '../data/testdata/data/vedtak/annullert'
import { avvistVedtakMedLavInntekt } from '../data/testdata/data/vedtak/avvistMedLavInntekt'

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
