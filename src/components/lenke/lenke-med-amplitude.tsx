import { Link } from '@navikt/ds-react'
import React from 'react'

import { logEvent } from '../amplitude/amplitude'

interface LenkeMedAmplitudeProps {
    tekst: string
    url: string
    cleanUrl?: string
    vedtakFastsattMed?: string
}

export const LenkeMedAmplitude = ({ tekst, url, cleanUrl, vedtakFastsattMed }: LenkeMedAmplitudeProps) => (
    <Link
        href={url}
        rel="noopener noreferrer"
        target="_blank"
        onClick={() =>
            logEvent('navigere', {
                destinasjon: cleanUrl ?? url,
                skjemanavn: 'vedtak',
                lenketekst: tekst,
                vedtakFastsattMed: vedtakFastsattMed || ''
            })
        }
    >
        {tekst}
    </Link>
)
