import { BodyLong, Heading } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { klagefrist } from '../../../utils/klagefrist'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { LenkeMedUmami } from '../../lenke/lenke-med-umami'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak-felles'

type UenigProps = { vedtak: RSVedtakWrapper }

const Uenig = ({ vedtak }: UenigProps) => {
    return (
        <>
            <Heading size="small" level="2" spacing>
                {tekst('uenig.tittel')}
            </Heading>
            <BodyLong spacing>
                {getLedetekst(tekst('uenig.tekst1'), {
                    '%KLAGEFRIST%': klagefrist(dayjs(vedtak.opprettetTimestamp)),
                })}
                {tekst('uenig.tekst2')}
                <LenkeMedUmami url={tekst('uenig.lenke1.url')} tekst={tekst('uenig.lenke1')} />
                {tekst('uenig.tekst3')}
                <LenkeMedUmami url={tekst('uenig.lenke2.url')} tekst={tekst('uenig.lenke2')} />.
            </BodyLong>
        </>
    )
}

export default Uenig
