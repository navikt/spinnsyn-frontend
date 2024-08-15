import { describe, test, expect } from 'vitest'
import dayjs from 'dayjs'

import { hentDager } from './hentDager'

describe('HentDagerTest', () => {
    const mandag = dayjs('2023-01-02')

    test('Kun arbeidsgiverperiode', () => {
        const result = hentDager(mandag.format('YYYY-MM-DD'), mandag.add(9, 'day').format('YYYY-MM-DD'), null, [
            { dato: mandag.format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
            { dato: mandag.add(1, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
            { dato: mandag.add(2, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
            { dato: mandag.add(3, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
            { dato: mandag.add(4, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
            { dato: mandag.add(5, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
            { dato: mandag.add(6, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
            { dato: mandag.add(7, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
            { dato: mandag.add(8, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
            { dato: mandag.add(9, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
        ])

        const expected = [
            {
                dato: mandag.format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(1, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(2, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(3, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(4, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(5, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(6, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(7, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(8, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(9, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
        ]

        expect(result).toEqual(expected)
    })

    test('Arbeidsgiverperiode oppbrukt', () => {
        const result = hentDager(
            mandag.format('YYYY-MM-DD'),
            mandag.add(17, 'day').format('YYYY-MM-DD'),
            {
                utbetalingslinjer: [
                    {
                        fom: mandag.add(16, 'day').format('YYYY-MM-DD'),
                        tom: mandag.add(17, 'day').format('YYYY-MM-DD'),
                        dagsats: 100,
                        totalbeløp: 200,
                        grad: 100.0,
                        stønadsdager: 2,
                    },
                ],
            },
            [
                { dato: mandag.format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(1, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(2, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(3, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(4, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(5, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(6, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(7, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(8, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(9, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(10, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(11, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(12, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(13, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(14, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(15, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(16, 'day').format('YYYY-MM-DD'), type: 'NavDag', begrunnelser: [] },
                { dato: mandag.add(17, 'day').format('YYYY-MM-DD'), type: 'NavDag', begrunnelser: [] },
            ],
        )

        const expected = [
            {
                dato: mandag.format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(1, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(2, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(3, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(4, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(5, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(6, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(7, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(8, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(9, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(10, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(11, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(12, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(13, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(14, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(15, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(16, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: mandag.add(17, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
        ]

        expect(result).toEqual(expected)
    })

    test('Arbeidsgiverperiode overtas av NAV midt i uka', () => {
        const result = hentDager(
            mandag.format('YYYY-MM-DD'),
            mandag.add(17, 'day').format('YYYY-MM-DD'),
            {
                utbetalingslinjer: [
                    {
                        fom: mandag.add(10, 'day').format('YYYY-MM-DD'),
                        tom: mandag.add(17, 'day').format('YYYY-MM-DD'),
                        dagsats: 100,
                        totalbeløp: 800,
                        grad: 100.0,
                        stønadsdager: 8,
                    },
                ],
            },
            [
                { dato: mandag.format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(1, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(2, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(3, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(4, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(5, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(6, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(7, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(8, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(9, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(10, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(11, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(12, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(13, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(14, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(15, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(16, 'day').format('YYYY-MM-DD'), type: 'NavDag', begrunnelser: [] },
                { dato: mandag.add(17, 'day').format('YYYY-MM-DD'), type: 'NavDag', begrunnelser: [] },
            ],
        )

        const expected = [
            {
                dato: mandag.format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(1, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(2, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(3, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(4, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(5, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(6, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(7, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(8, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(9, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(10, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: mandag.add(11, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: mandag.add(12, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'NavHelgDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(13, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'NavHelgDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(14, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: mandag.add(15, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: mandag.add(16, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: mandag.add(17, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
        ]

        expect(result).toEqual(expected)
    })

    test('Arbeidsgiverperiode overtas av NAV på mandag, da blir helgen før også overtatt og vises som helg', () => {
        const result = hentDager(
            mandag.format('YYYY-MM-DD'),
            mandag.add(17, 'day').format('YYYY-MM-DD'),
            {
                utbetalingslinjer: [
                    {
                        fom: mandag.add(7, 'day').format('YYYY-MM-DD'),
                        tom: mandag.add(17, 'day').format('YYYY-MM-DD'),
                        dagsats: 100,
                        totalbeløp: 900,
                        grad: 100.0,
                        stønadsdager: 9,
                    },
                ],
            },
            [
                { dato: mandag.format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(1, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(2, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(3, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(4, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(5, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(6, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(7, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(8, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(9, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(10, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(11, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(12, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(13, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(14, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(15, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: mandag.add(16, 'day').format('YYYY-MM-DD'), type: 'NavDag', begrunnelser: [] },
                { dato: mandag.add(17, 'day').format('YYYY-MM-DD'), type: 'NavDag', begrunnelser: [] },
            ],
        )

        const expected = [
            {
                dato: mandag.format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(1, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(2, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(3, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(4, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(5, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'NavHelgDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(6, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'NavHelgDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(7, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: mandag.add(8, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: mandag.add(9, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: mandag.add(10, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: mandag.add(11, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: mandag.add(12, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'NavHelgDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(13, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'NavHelgDag',
                begrunnelser: [],
            },
            {
                dato: mandag.add(14, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: mandag.add(15, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: mandag.add(16, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: mandag.add(17, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
        ]

        expect(result).toEqual(expected)
    })

    test('Arbeidsgiverperiode blir oppbrukt på en søndag', () => {
        const sondag = mandag.subtract(1, 'day')

        const result = hentDager(
            sondag.subtract(15, 'day').format('YYYY-MM-DD'),
            sondag.add(2, 'day').format('YYYY-MM-DD'),
            {
                utbetalingslinjer: [
                    {
                        fom: sondag.add(1, 'day').format('YYYY-MM-DD'),
                        tom: sondag.add(2, 'day').format('YYYY-MM-DD'),
                        dagsats: 100,
                        totalbeløp: 200,
                        grad: 100.0,
                        stønadsdager: 2,
                    },
                ],
            },
            [
                {
                    dato: sondag.subtract(15, 'day').format('YYYY-MM-DD'),
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: sondag.subtract(14, 'day').format('YYYY-MM-DD'),
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: sondag.subtract(13, 'day').format('YYYY-MM-DD'),
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: sondag.subtract(12, 'day').format('YYYY-MM-DD'),
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: sondag.subtract(11, 'day').format('YYYY-MM-DD'),
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: sondag.subtract(10, 'day').format('YYYY-MM-DD'),
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: sondag.subtract(9, 'day').format('YYYY-MM-DD'),
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: sondag.subtract(8, 'day').format('YYYY-MM-DD'),
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: sondag.subtract(7, 'day').format('YYYY-MM-DD'),
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: sondag.subtract(6, 'day').format('YYYY-MM-DD'),
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: sondag.subtract(5, 'day').format('YYYY-MM-DD'),
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: sondag.subtract(4, 'day').format('YYYY-MM-DD'),
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: sondag.subtract(3, 'day').format('YYYY-MM-DD'),
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: sondag.subtract(2, 'day').format('YYYY-MM-DD'),
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: sondag.subtract(1, 'day').format('YYYY-MM-DD'),
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                { dato: sondag.format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(1, 'day').format('YYYY-MM-DD'), type: 'NavDag', begrunnelser: [] },
                { dato: sondag.add(2, 'day').format('YYYY-MM-DD'), type: 'NavDag', begrunnelser: [] },
            ],
        )

        const expected = [
            {
                dato: sondag.subtract(15, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.subtract(14, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.subtract(13, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.subtract(12, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.subtract(11, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.subtract(10, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.subtract(9, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.subtract(8, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.subtract(7, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.subtract(6, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.subtract(5, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.subtract(4, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.subtract(3, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.subtract(2, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.subtract(1, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'ArbeidsgiverperiodeDag',
                begrunnelser: [],
            },
            {
                dato: sondag.add(1, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: sondag.add(2, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
        ]

        expect(result).toEqual(expected)
    })

    test('Arbeidsgiverperiode overtas av NAV og første dag er i helga', () => {
        const sondag = mandag.subtract(1, 'day')

        const result = hentDager(
            sondag.format('YYYY-MM-DD'),
            sondag.add(17, 'day').format('YYYY-MM-DD'),
            {
                utbetalingslinjer: [
                    {
                        fom: sondag.add(1, 'day').format('YYYY-MM-DD'),
                        tom: sondag.add(17, 'day').format('YYYY-MM-DD'),
                        dagsats: 100,
                        totalbeløp: 1300,
                        grad: 100.0,
                        stønadsdager: 13,
                    },
                ],
            },
            [
                { dato: sondag.format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(1, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(2, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(3, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(4, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(5, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(6, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(7, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(8, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(9, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(10, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(11, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(12, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(13, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(14, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(15, 'day').format('YYYY-MM-DD'), type: 'ArbeidsgiverperiodeDag', begrunnelser: [] },
                { dato: sondag.add(16, 'day').format('YYYY-MM-DD'), type: 'NavDag', begrunnelser: [] },
                { dato: sondag.add(17, 'day').format('YYYY-MM-DD'), type: 'NavDag', begrunnelser: [] },
            ],
        )

        const expected = [
            { dato: sondag.format('YYYY-MM-DD'), belop: 0, grad: 0.0, dagtype: 'NavHelgDag', begrunnelser: [] },
            {
                dato: sondag.add(1, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: sondag.add(2, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: sondag.add(3, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: sondag.add(4, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: sondag.add(5, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: sondag.add(6, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'NavHelgDag',
                begrunnelser: [],
            },
            {
                dato: sondag.add(7, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'NavHelgDag',
                begrunnelser: [],
            },
            {
                dato: sondag.add(8, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: sondag.add(9, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: sondag.add(10, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: sondag.add(11, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: sondag.add(12, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: sondag.add(13, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'NavHelgDag',
                begrunnelser: [],
            },
            {
                dato: sondag.add(14, 'day').format('YYYY-MM-DD'),
                belop: 0,
                grad: 0.0,
                dagtype: 'NavHelgDag',
                begrunnelser: [],
            },
            {
                dato: sondag.add(15, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: sondag.add(16, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
            {
                dato: sondag.add(17, 'day').format('YYYY-MM-DD'),
                belop: 100,
                grad: 100.0,
                dagtype: 'NavDagSyk',
                begrunnelser: [],
            },
        ]

        expect(result).toEqual(expected)
    })
})
