import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

import { RSDag, RSOppdrag, RSUtbetalingdag } from '../types/rs-types/rs-vedtak-felles'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const helg = [6, 0] // Saturday and Sunday

export function hentDager(
    fom: string,
    tom: string,
    oppdragDto?: RSOppdrag | null,
    utbetalingsdager?: RSUtbetalingdag[] | null,
): RSDag[] {
    const startDate = dayjs(fom)
    const endDate = dayjs(tom)

    let dager = [] as RSDag[]

    for (let date = startDate; date.isBefore(endDate.add(1, 'day')); date = date.add(1, 'day')) {
        const dayOfWeek = date.day()
        dager.push({
            dato: date.format('YYYY-MM-DD'),
            belop: 0,
            grad: 0.0,
            dagtype: helg.includes(dayOfWeek) ? 'NavHelgDag' : 'NavDag',
            begrunnelser: [],
        })
    }

    dager = dager.map((dag) => {
        const overlappendeLinjer =
            oppdragDto?.utbetalingslinjer.filter(
                (linje) => dayjs(linje.fom).isSameOrBefore(dag.dato) && dayjs(linje.tom).isSameOrAfter(dag.dato),
            ) || []

        return overlappendeLinjer.reduce((dagen, linje) => {
            const utbetalingslinjeUtenUtbetaling = linje.stønadsdager === 0
            return {
                ...dagen,
                belop: utbetalingslinjeUtenUtbetaling ? 0 : linje.dagsats,
                grad: utbetalingslinjeUtenUtbetaling ? 0.0 : linje.grad,
            }
        }, dag)
    })

    dager = dager.map((dag): RSDag => {
        const utbetalingsdagen = utbetalingsdager?.find((u) => u.dato === dag.dato) || null

        if (!utbetalingsdagen) return dag

        const dayOfWeek = dayjs(dag.dato).day()
        const erHelg = helg.includes(dayOfWeek)
        return {
            ...dag,
            begrunnelser: utbetalingsdagen.begrunnelser,
            dagtype: (() => {
                switch (utbetalingsdagen.type) {
                    case 'NavDag':
                        return dag.grad < 100 ? 'NavDagDelvisSyk' : 'NavDagSyk'
                    case 'ArbeidsgiverperiodeDag':
                        if (dag.belop === 0) return 'ArbeidsgiverperiodeDag'
                        if (erHelg) return 'NavHelgDag'
                        return dag.grad < 100 ? 'NavDagDelvisSyk' : 'NavDagSyk'
                    default:
                        return utbetalingsdagen.type
                }
            })(),
            belop: erHelg ? 0 : dag.belop,
            grad: erHelg ? 0.0 : dag.grad,
        }
    })

    const sisteArbeidsgiverperiodeDag = dager
        .slice()
        .reverse()
        .find((dag) => dag.dagtype === 'ArbeidsgiverperiodeDag')

    if (sisteArbeidsgiverperiodeDag && dayjs(sisteArbeidsgiverperiodeDag.dato).day() === 0) {
        const overtagelseMandag = utbetalingsdager?.find((u) =>
            dayjs(u.dato).isSame(dayjs(sisteArbeidsgiverperiodeDag.dato).add(1, 'day')),
        )

        if (overtagelseMandag?.type === 'ArbeidsgiverperiodeDag') {
            dager = dager.map((dag) => {
                const dato = dayjs(dag.dato)
                if (
                    dato.isSame(dayjs(overtagelseMandag.dato).subtract(2, 'days')) ||
                    dato.isSame(dayjs(overtagelseMandag.dato).subtract(1, 'days'))
                ) {
                    return { ...dag, dagtype: 'NavHelgDag' }
                }
                return dag
            })
        }
    }

    const sisteUtbetalteDag = dager
        .slice()
        .reverse()
        .findIndex((dag) => dag.belop > 0)

    if (sisteUtbetalteDag === -1) return dager

    const sisteUtbetalteDagIndex = dager.length - sisteUtbetalteDag - 1

    const annenUtbetalingISlutten = dager
        .slice(sisteUtbetalteDagIndex + 1)
        .findIndex((dag) => dag.belop === 0 && dagtyperMedUtbetaling.includes(dag.dagtype))

    if (annenUtbetalingISlutten > -1) {
        dager = dager.slice(0, sisteUtbetalteDagIndex + 1 + annenUtbetalingISlutten)
    }

    const forsteUtbetalteDag = dager.findIndex((dag) => dag.belop > 0)
    const annenUtbetalingIStarten = dager
        .slice(0, forsteUtbetalteDag)
        .reverse()
        .findIndex((dag) => dag.belop === 0 && dagtyperMedUtbetaling.includes(dag.dagtype))
    if (annenUtbetalingIStarten > -1) {
        dager = dager.slice(forsteUtbetalteDag)
    }

    return dager
}

const dagtyperMedUtbetaling = ['NavDag', 'NavDagDelvisSyk', 'NavDagSyk']
