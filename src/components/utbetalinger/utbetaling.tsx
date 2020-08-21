import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { UtbetalingslinjeDto } from '../../types/vedtak'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import { ValutaFormat } from '../../utils/valuta-utils'

interface UtbetalingProps {
    utbetaling: UtbetalingslinjeDto;
    fra: string;
}

const Utbetaling = ({ utbetaling, fra }: UtbetalingProps) => {
    const trekk = 0.2        // TODO: Er denne alltid 20?

    const hvemBetaler = () => {
        if (fra === 'SPREF') return 'arbeidsgiver'
        if (fra === 'SP') return 'NAV'
        return 'NAV'
    }

    const dagsats = () => {
        return ValutaFormat.format(utbetaling.beløp)
    }

    const total = () => {
        const dager = utbetaling.sykedager
        const total = utbetaling.beløp * dager
        const grad = Math.floor(utbetaling.grad)  // TODO: Skal det alltid rundes ned?
        return `${ValutaFormat.format(total)} (${dager} dager - ${grad} % sykmeldt)`
    }

    const forskuddstrekk = () => {
        const total = utbetaling.beløp * utbetaling.sykedager
        const trekkes = total * trekk
        return `${ValutaFormat.format(trekkes)} (${trekk * 100} %)`
    }

    const sum = () => {
        const total = utbetaling.beløp * utbetaling.sykedager
        const sum = total * (1 - trekk)
        return `${ValutaFormat.format(sum)}`
    }

    return (
        <table className="utbetaling__tabell">
            <Element tag="caption">
                {tekst('utbetaling.gjelder') + tilLesbarPeriodeMedArstall(utbetaling.fom, utbetaling.tom)}
            </Element>
            <thead>
                <tr>
                    <td colSpan={2}>
                        <Element tag="span">
                            {tekst('utbetaling.utbetales') + hvemBetaler()}
                        </Element>
                    </td>
                </tr>
            </thead>
            <tbody>
                <Normaltekst tag="tr">
                    <th> {tekst('utbetaling.dagsats')} </th>
                    <td> {dagsats()} </td>
                </Normaltekst>
                <Normaltekst tag="tr" className="utbetaling__tabell--underlinje">
                    <th> {tekst('utbetaling.total')} </th>
                    <td> {total()} </td>
                </Normaltekst>
                <Normaltekst tag="tr">
                    <th> {tekst('utbetaling.forskuddstrekk')} </th>
                    <td> {forskuddstrekk()} </td>
                </Normaltekst>
                <Undertittel tag="tr" className="utbetaling__tabell--sum">
                    <th> {tekst('utbetaling.sum')} </th>
                    <td> {sum()} </td>
                </Undertittel>
            </tbody>
        </table>
    )
}

export default Utbetaling
