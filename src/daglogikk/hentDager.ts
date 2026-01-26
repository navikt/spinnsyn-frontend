import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

import { RSDag, RSDagTypeKomplett, RSOppdrag, RSUtbetalingdag } from '../types/rs-types/rs-vedtak-felles'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const DAGTYPER_MED_UTBETALING = ['NavDag', 'NavDagDelvisSyk', 'NavDagSyk'] as const
const SONDAG = 0

export function hentDager(
    fom: string,
    tom: string,
    oppdragDto?: RSOppdrag | null,
    utbetalingsdager?: RSUtbetalingdag[] | null,
): RSDag[] {
    const transformasjoner = [
        (dager: RSDag[]) => leggTilBelopOgGrad(dager, oppdragDto),
        (dager: RSDag[]) => leggTilUtbetalingsdagInfo(dager, utbetalingsdager),
        (dager: RSDag[]) => handterHelgFoerNavOvertarUtbetaling(dager, utbetalingsdager),
        trimmPeriode,
    ]

    return transformasjoner.reduce((dager, transformasjon) => transformasjon(dager), opprettDagerIPeriode(fom, tom))
}

function opprettDagerIPeriode(fom: string, tom: string): RSDag[] {
    const startDato = dayjs(fom)
    const sluttDato = dayjs(tom)
    const dager: RSDag[] = []

    for (let dato = startDato; dato.isSameOrBefore(sluttDato); dato = dato.add(1, 'day')) {
        const datoString = dato.format('YYYY-MM-DD')
        const ukedag = dato.day()
        dager.push({
            dato: datoString,
            belop: 0,
            grad: 0.0,
            dagtype: ukedag === 0 || ukedag === 6 ? 'NavHelgDag' : 'NavDag',
            begrunnelser: [],
        })
    }

    return dager
}

function leggTilBelopOgGrad(dager: RSDag[], oppdrag?: RSOppdrag | null): RSDag[] {
    if (!oppdrag) return dager

    return dager.map((dag) => {
        const overlappendeLinjer = oppdrag.utbetalingslinjer.filter(
            (linje) => dayjs(linje.fom).isSameOrBefore(dag.dato) && dayjs(linje.tom).isSameOrAfter(dag.dato),
        )

        return overlappendeLinjer.reduce((akkumulator, linje) => {
            const harUtbetaling = linje.stønadsdager > 0
            return {
                ...akkumulator,
                belop: harUtbetaling ? linje.dagsats : 0,
                grad: harUtbetaling ? linje.grad : 0.0,
            }
        }, dag)
    })
}

function leggTilUtbetalingsdagInfo(dager: RSDag[], utbetalingsdager?: RSUtbetalingdag[] | null): RSDag[] {
    if (!utbetalingsdager) return dager

    const utbetalingsdagMap = new Map(utbetalingsdager.map((u) => [u.dato, u]))

    return dager.map((dag): RSDag => {
        const utbetalingsdag = utbetalingsdagMap.get(dag.dato)
        if (!utbetalingsdag) return dag

        const dagDato = dayjs(dag.dato)
        const erHelg = dagDato.day() === 0 || dagDato.day() === 6

        const dagtype: RSDagTypeKomplett = (() => {
            if (
                utbetalingsdag.type === 'NavDag' ||
                utbetalingsdag.type === 'NavDagSyk' ||
                utbetalingsdag.type === 'NavDagDelvisSyk'
            ) {
                return 'NavDag'
            }
            if (utbetalingsdag.type === 'ArbeidsgiverperiodeDag') {
                if (dag.belop === 0) return 'ArbeidsgiverperiodeDag'
                if (erHelg) return 'NavHelgDag'
                return dag.grad < 100 ? 'NavDagDelvisSyk' : 'NavDagSyk'
            }
            return utbetalingsdag.type
        })()

        return {
            ...dag,
            begrunnelser: utbetalingsdag.begrunnelser,
            dagtype,
            belop: erHelg ? 0 : dag.belop,
            grad: erHelg ? 0.0 : dag.grad,
        }
    })
}

function handterHelgFoerNavOvertarUtbetaling(dager: RSDag[], utbetalingsdager?: RSUtbetalingdag[] | null): RSDag[] {
    const sisteArbeidsgiverperiodeDag = dager.findLast((dag) => dag.dagtype === 'ArbeidsgiverperiodeDag')
    if (!sisteArbeidsgiverperiodeDag || dayjs(sisteArbeidsgiverperiodeDag.dato).day() !== SONDAG) {
        return dager
    }

    const mandagDato = dayjs(sisteArbeidsgiverperiodeDag.dato).add(1, 'day')
    const overtagelseMandag = utbetalingsdager?.find((u) => dayjs(u.dato).isSame(mandagDato))

    if (overtagelseMandag?.type !== 'ArbeidsgiverperiodeDag') {
        return dager
    }

    const lordagDato = mandagDato.subtract(2, 'days')
    const sondagDato = mandagDato.subtract(1, 'days')

    return dager.map((dag) => {
        const dato = dayjs(dag.dato)
        return dato.isSame(lordagDato) || dato.isSame(sondagDato) ? { ...dag, dagtype: 'NavHelgDag' } : dag
    })
}

function trimmPeriode(dager: RSDag[]): RSDag[] {
    const forsteUtbetalteDagIndex = dager.findIndex((dag) => dag.belop > 0)
    const sisteUtbetalteDagIndex = dager.findLastIndex((dag) => dag.belop > 0)

    if (forsteUtbetalteDagIndex === -1) return dager

    let startIndex = 0
    const dagerForForsteUtbetaling = dager.slice(0, forsteUtbetalteDagIndex).reverse()
    const harUtbetalingsdagUtenBelopIStarten = dagerForForsteUtbetaling.some(
        (dag) => dag.belop === 0 && (DAGTYPER_MED_UTBETALING as readonly string[]).includes(dag.dagtype),
    )
    if (harUtbetalingsdagUtenBelopIStarten) {
        startIndex = forsteUtbetalteDagIndex
    }

    let sluttIndex = dager.length
    const dagerEtterSisteUtbetaling = dager.slice(sisteUtbetalteDagIndex + 1)
    const utbetalingsdagUtenBelopIndex = dagerEtterSisteUtbetaling.findIndex(
        (dag) => dag.belop === 0 && (DAGTYPER_MED_UTBETALING as readonly string[]).includes(dag.dagtype),
    )
    if (utbetalingsdagUtenBelopIndex !== -1) {
        sluttIndex = sisteUtbetalteDagIndex + 1 + utbetalingsdagUtenBelopIndex
    }

    return dager.slice(startIndex, sluttIndex)
}
