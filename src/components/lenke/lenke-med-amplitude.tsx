import { Link } from '@navikt/ds-react'
import React from 'react'

import { logEvent } from '../amplitude/amplitude'

interface LenkeMedAmplitudeProps {
    tekst: string
    url: string
    cleanUrl?: string
    skjønnsfastsatt?: boolean
}

export const LenkeMedAmplitude = ({ tekst, url, cleanUrl, skjønnsfastsatt }: LenkeMedAmplitudeProps) => (
    <Link
        href={url}
        rel="noopener noreferrer"
        target="_blank"
        onClick={() =>
            logEvent('navigere', {
                destinasjon: cleanUrl ?? url,
                skjemanavn: 'vedtak',
                lenketekst: tekst,
                skjønnsfastsatt: skjønnsfastsatt ?? false,
            })
        }
    >
        {tekst}
    </Link>
)
