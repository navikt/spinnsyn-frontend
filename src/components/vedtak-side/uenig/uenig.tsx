import { BodyLong, Heading } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { klagefrist } from '../../../utils/klagefrist'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { LenkeMedAmplitude } from '../../lenke/lenke-med-amplitude'
import { VedtakProps } from '../vedtak'

const Uenig = ({ vedtak }: VedtakProps) => {
    return (
        <>
            <Heading size="small" level="2">
                Har du spørsmål til vedtaket?
            </Heading>
            <BodyLong spacing>
                Hvis du har spørsmål til vedtaket så kan du{' '}
                <LenkeMedAmplitude url={tekst('behandling.lenke.url')} tekst="kontakte oss " /> på nav.no.
            </BodyLong>
            <Heading size="small" level="2">
                Er det en feil i vedtaket?
            </Heading>
            <BodyLong spacing>
                Skyldes feilen et feil svar i søknaden så kan du{' '}
                <LenkeMedAmplitude
                    url="https://demo.ekstern.dev.nav.no/syk/sykepengesoknad"
                    tekst="korrigere søknaden"
                />{' '}
                på nav.no.{' '}
                {getLedetekst(tekst('uenig.tekst1'), {
                    '%KLAGEFRIST%': klagefrist(dayjs(vedtak.opprettetTimestamp)),
                })}
                {tekst('uenig.tekst2')}
                <LenkeMedAmplitude url={tekst('uenig.lenke1.url')} tekst={tekst('uenig.lenke1')} />
                {tekst('uenig.tekst3')}
                <LenkeMedAmplitude url={tekst('uenig.lenke2.url')} tekst={tekst('uenig.lenke2')} />.
            </BodyLong>
        </>
    )
}

export default Uenig
