import { BodyLong, Heading } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { klagefrist } from '../../../utils/klagefrist'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { LenkeMedAmplitude } from '../../lenke/lenke-med-amplitude'
import { VedtakProps } from '../vedtak'

const Uenig = ({ vedtak }: VedtakProps) => {
    return (
        <div className="tekstinfo">
            <Heading size="small" level="2">
                {tekst('uenig.tittel')}
            </Heading>
            <BodyLong spacing>
                {getLedetekst(tekst('uenig.tekst1'), {
                    '%KLAGEFRIST%': klagefrist(dayjs(vedtak.opprettetTimestamp)),
                })}
                {tekst('uenig.tekst2')}
                <LenkeMedAmplitude url={tekst('uenig.lenke1.url')} tekst={tekst('uenig.lenke1')} />
                {tekst('uenig.tekst3')}
                <LenkeMedAmplitude url={tekst('uenig.lenke2.url')} tekst={tekst('uenig.lenke2')} />.
            </BodyLong>
        </div>
    )
}

export default Uenig
