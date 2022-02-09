import { Link } from '@navikt/ds-react'
import React from 'react'

import { logEvent } from '../amplitude/amplitude'

interface LenkeMedAmplitudeProps {
    tekst: string,
    url: string,
}

export const LenkeMedAmplitude = ({ tekst, url }: LenkeMedAmplitudeProps) =>
    (
        <Link href={url}
            rel="noopener noreferrer"
            target="_blank"
            onClick={() => logEvent('navigere', {
                destinasjon: url,
                skjemanavn: 'vedtak',
                lenketekst: tekst
            })}
        >
            {tekst}
        </Link>

    )
