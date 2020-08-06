import './utbetaling.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { UtbetalingslinjeDto } from '../../types/vedtak'
import { tekst } from '../../utils/tekster'

interface UtbetalingProps {
    utbetaling: UtbetalingslinjeDto;
}

const Utbetaling = ({ utbetaling }: UtbetalingProps) => {
    const trekk = 20        // TODO: Er denne alltid 20?

    const dagsats = () => {
        return `${utbetaling.dagsats}kr`
    }

    const total = () => {
        const total = utbetaling.beløp
        const dager = utbetaling.sykedager
        const grad = Math.floor(utbetaling.grad * 100)  // TODO: Skal det alltid rundes ned?

        return `${total}kr (${dager} dager - ${grad}% sykmeldt)`
    }

    const forskuddstrekk = () => {
        const trekkes = utbetaling.beløp * trekk

        return `${trekkes}kr (${trekk}%)`
    }

    const sum = () => {
        const sum = utbetaling.beløp * (100 - trekk)

        return `${sum}kr`
    }

    return (
        <table className='utbetaling'>
            <Normaltekst tag='tr'>
                <td> {tekst('utbetaling.dagsats')} </td>
                <td> {dagsats()} </td>
            </Normaltekst>
            <Normaltekst tag='tr' className='underlinje'>
                <td> {tekst('utbetaling.total')} </td>
                <td> {total()} </td>
            </Normaltekst>
            <Normaltekst tag='tr'>
                <td> {tekst('utbetaling.forskuddstrekk')} </td>
                <td> {forskuddstrekk()} </td>
            </Normaltekst>
            <Normaltekst tag='tr'>
                <td> {tekst('utbetaling.sum')} </td>
                <td> {sum()} </td>
            </Normaltekst>
        </table>
    )
}

export default Utbetaling
