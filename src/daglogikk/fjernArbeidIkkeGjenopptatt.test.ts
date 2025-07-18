import dayjs from 'dayjs'
import { describe, test, expect } from 'vitest'

import { RSDag, RSDagTypeKomplett } from '../types/rs-types/rs-vedtak-felles'
import { jsonDeepCopy } from '../utils/json-deep-copy'
import { vedtakMedDetMeste } from '../data/testdata/data/vedtak/medDetMeste'

import { fjernArbeidIkkeGjenopptattDager } from './fjernArbeidIkkeGjenopptatt'
import { finnFaktiskFom } from './finnFaktiskFom'

function rSDag(dagersiden: number, dagtype: RSDagTypeKomplett): RSDag {
    return {
        dato: dayjs().subtract(dagersiden, 'day').format('YYYY-MM-DD'),
        dagtype: dagtype,
        belop: 12,
        grad: 100.0,
        begrunnelser: [],
    }
}

describe('FiltrerArbeidIkkeGjennopptattKtTest', () => {
    test('fjerner arbeid ikke gjenopptatt dager', () => {
        const vedtakMedDager = jsonDeepCopy(vedtakMedDetMeste)

        vedtakMedDager.dagerPerson = [
            rSDag(5, 'ArbeidIkkeGjenopptattDag'),
            rSDag(4, 'ArbeidIkkeGjenopptattDag'),
            rSDag(3, 'NavDag'),
        ]
        vedtakMedDager.dagerArbeidsgiver = []
        vedtakMedDager.vedtak.fom = dayjs().subtract(5, 'day').format('YYYY-MM-DD')
        vedtakMedDager.vedtak.tom = dayjs().format('YYYY-MM-DD')

        const vedtakUtenArbeidIkkeGjenopptattDager = fjernArbeidIkkeGjenopptattDager(vedtakMedDager.dagerPerson)

        expect(vedtakUtenArbeidIkkeGjenopptattDager).toHaveLength(1)
        expect(vedtakUtenArbeidIkkeGjenopptattDager[0].dato).toBe(dayjs().subtract(3, 'day').format('YYYY-MM-DD'))

        const faktiskFom = finnFaktiskFom({
            dagerArbeidsgiver: vedtakMedDager.dagerArbeidsgiver,
            dagerPerson: vedtakUtenArbeidIkkeGjenopptattDager,
            opprinneligFom: vedtakMedDager.vedtak.fom,
        })

        expect(faktiskFom).toBe(dayjs().subtract(3, 'day').format('YYYY-MM-DD'))
    })

    test('fjerner ikke vanlige dager', () => {
        const vedtakMedDager = jsonDeepCopy(vedtakMedDetMeste)
        vedtakMedDager.dagerArbeidsgiver = []

        vedtakMedDager.dagerPerson = [rSDag(5, 'NavDag'), rSDag(4, 'NavDag'), rSDag(3, 'NavDag')]
        vedtakMedDager.vedtak.fom = dayjs().subtract(5, 'day').format('YYYY-MM-DD')
        vedtakMedDager.vedtak.tom = dayjs().format('YYYY-MM-DD')

        const vedtakUtenArbeidIkkeGjenopptattDager = fjernArbeidIkkeGjenopptattDager(vedtakMedDager.dagerPerson)

        expect(vedtakUtenArbeidIkkeGjenopptattDager).toHaveLength(3)
        const faktiskFom = finnFaktiskFom({
            dagerArbeidsgiver: vedtakMedDager.dagerArbeidsgiver,
            dagerPerson: vedtakUtenArbeidIkkeGjenopptattDager,
            opprinneligFom: vedtakMedDager.vedtak.fom,
        })
        expect(faktiskFom).toBe(dayjs().subtract(5, 'day').format('YYYY-MM-DD'))
    })
})
