import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
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
import { kombinertDirekteOgRefusjon } from '../data/testdata/data/vedtak/kombinert'
import { kunAgPeriode } from '../data/testdata/data/vedtak/kunAgPeriode'
import { vedtakMedDetMeste } from '../data/testdata/data/vedtak/medDetMeste'
import { nullOmregnetAarsinntekt } from '../data/testdata/data/vedtak/nullOmregnetAarsinntekt'
import { vedtakRedusertTil6G } from '../data/testdata/data/vedtak/redusertTil6g'
import { vedtakRevurdert } from '../data/testdata/data/vedtak/revurdert'
import { vedtakRevurdertDirekte } from '../data/testdata/data/vedtak/revurdertDirekte'
import { revurdertOgAnnullertVedtak } from '../data/testdata/data/vedtak/revurdertOgAnnullert'
import { skjonnsfastsattRiktigAarsinntekt } from '../data/testdata/data/vedtak/skjonnsfastsattRiktigAarsinntekt'
import {
    skjønnsfastsattBrukerutbetaling,
    skjønnsfastsattFlereArbeidsgivere,
} from '../data/testdata/data/vedtak/skjønnsfastsatt'
import { slutterMedRefusjon } from '../data/testdata/data/vedtak/slutterMedRefusjon'
import { vedtakDerDetSluttesMedDelvisRefusjon } from '../data/testdata/data/vedtak/vedtakDerDetSluttesMedDelvisRefusjon'
import { vedtakMed0Utbetaling } from '../data/testdata/data/vedtak/vedtakMed0Utbetaling'
import { vedtakMedFlereArbeidsgivere } from '../data/testdata/data/vedtak/vedtakMedFlereArbeidsgivere'

import { verifiserDaglogikk } from './verifiserDaglogikk'

describe('Verifisering av testdata', () => {
    function verifiserTestdataVedtak(vedtak: RSVedtakWrapper) {
        const prossesertVedtak = verifiserDaglogikk(vedtak)
        expect(prossesertVedtak.nyBeregning).toEqual(prossesertVedtak.opprinneligBeregning)
    }

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
    test('kombinert', () => {
        verifiserTestdataVedtak(kombinertDirekteOgRefusjon)
    })
    test('kunagp', () => {
        verifiserTestdataVedtak(kunAgPeriode)
    })
    test('Kun direkte vedtak', () => {
        verifiserTestdataVedtak(kunDirekte)
    })
    test('Med det meste', () => {
        verifiserTestdataVedtak(vedtakMedDetMeste)
    })
    test('nullOmregnetAarsinntekt', () => {
        verifiserTestdataVedtak(nullOmregnetAarsinntekt)
    })

    test('vedtakRedusertTil6G', () => {
        verifiserTestdataVedtak(vedtakRedusertTil6G)
    })

    test('revurdert', () => {
        verifiserTestdataVedtak(vedtakRevurdert)
    })

    test('revurdertdirekte', () => {
        verifiserTestdataVedtak(vedtakRevurdertDirekte)
    })

    test('revurdertOgAnnullertVedtak', () => {
        verifiserTestdataVedtak(revurdertOgAnnullertVedtak)
    })

    test('skjonnsfastsattRiktigAarsinntekt', () => {
        verifiserTestdataVedtak(skjonnsfastsattRiktigAarsinntekt[0])
    })

    test('skjonnsfastsattRiktigAarsinntekt1', () => {
        verifiserTestdataVedtak(skjonnsfastsattRiktigAarsinntekt[1])
    })
    test('skjonnsfastsattRiktigAarsinntekt2', () => {
        verifiserTestdataVedtak(skjonnsfastsattRiktigAarsinntekt[2])
    })
    test('skjonnsfastsattRiktigAarsinntekt3', () => {
        verifiserTestdataVedtak(skjonnsfastsattRiktigAarsinntekt[3])
    })
    test('skjønnsfastsattBrukerutbetaling', () => {
        verifiserTestdataVedtak(skjønnsfastsattBrukerutbetaling)
    })
    test('slutterMedRefusjon', () => {
        verifiserTestdataVedtak(slutterMedRefusjon)
    })

    test('vedtakDerDetSluttesMedDelvisRefusjon', () => {
        verifiserTestdataVedtak(vedtakDerDetSluttesMedDelvisRefusjon)
    })
    test('vedtakMed0Utbetaling', () => {
        verifiserTestdataVedtak(vedtakMed0Utbetaling)
    })
    test('vedtakMedFlereArbeidsgivere', () => {
        verifiserTestdataVedtak(vedtakMedFlereArbeidsgivere)
    })
    test('skjønnsfastsattFlereArbeidsgivere', () => {
        verifiserTestdataVedtak(skjønnsfastsattFlereArbeidsgivere)
    })
})
