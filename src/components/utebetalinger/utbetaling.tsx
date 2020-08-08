import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { UtbetalingslinjeDto } from '../../types/vedtak'
import { tekst } from '../../utils/tekster'

interface UtbetalingProps {
    utbetaling: UtbetalingslinjeDto;
}

const Utbetaling = ({ utbetaling }: UtbetalingProps) => {
    const trekk = 0.2        // TODO: Er denne alltid 20?
    const Nummer = Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' })

    const dagsats = () => {
        return Nummer.format(utbetaling.dagsats)
    }

    const total = () => {
        const total = utbetaling.beløp
        const dager = utbetaling.sykedager
        const grad = Math.floor(utbetaling.grad * 100)  // TODO: Skal det alltid rundes ned?
        return `${Nummer.format(total)} (${dager} dager - ${grad} % sykmeldt)`
    }

    const forskuddstrekk = () => {
        const trekkes = utbetaling.beløp * trekk
        return `${Nummer.format(trekkes)} (${trekk * 100} %)`
    }

    const sum = () => {
        const sum = utbetaling.beløp * (1 - trekk)
        return `${Nummer.format(sum)}`
    }

    return (
        <table className="utbetaling__tabell">
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
