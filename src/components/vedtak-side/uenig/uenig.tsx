import { BodyLong, Heading, Label, Link } from '@navikt/ds-react'
import React from 'react'

import { getLedetekst, tekst } from '../../../utils/tekster'
import { klagefrist } from '../../../utils/vedtak-utils'
import { logEvent } from '../../amplitude/amplitude'
import { VedtakProps } from '../vedtak'

const Uenig = ({ vedtak }: VedtakProps) => {
    return (
        <div className="tekstinfo">
            <Heading spacing size="medium" level="4">
                {tekst('uenig.tittel')}
            </Heading>
            <BodyLong spacing size="small">
                {getLedetekst(tekst('uenig.tekst1'), { '%KLAGEFRIST%': klagefrist(vedtak) })}
                {tekst('uenig.tekst2')}
                <Link href={tekst('uenig.lenke1.url')} target="_blank">
                    {tekst('uenig.lenke1')}
                </Link>,
                {tekst('uenig.tekst3')}
                <Link href={tekst('uenig.lenke2.url')}
                    target="_blank"
                    onClick={() => logEvent('navigere', {
                        destinasjon: tekst('uenig.lenke2.url'),
                        skjemanavn: 'vedtak'
                    })}
                >
                    {tekst('uenig.lenke2')}
                </Link>.
            </BodyLong>

            <Label spacing as="h3">
                {tekst('uenig.egenklagefrist.tittel')}
            </Label>
            <BodyLong spacing size="small">
                {tekst('uenig.egenklagefrist.tekst')}
            </BodyLong>
        </div>
    )
}

export default Uenig
