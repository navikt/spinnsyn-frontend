import { BodyLong, Heading } from '@navikt/ds-react'
import React from 'react'

import { LenkeMedAmplitude } from '../../lenke/lenke-med-amplitude'

export const SporsmalEllerFeil = () => {
    return (
        <>
            <Heading size="small" level="2">
                Spørsmål eller feil
            </Heading>
            <BodyLong spacing>
                {'Lurer du på noe eller har du funnet en feil i vedtaket, kan du '}
                <LenkeMedAmplitude url="https://www.nav.no/kontaktoss" tekst="kontakte NAV" />.
                {' Har du funnet en feil i vedtaket som skyldes feil i søknaden kan du endre dette selv ved å '}
                <LenkeMedAmplitude url="/syk/sykepengesoknad" tekst="endre svarene i søknaden" />.
            </BodyLong>
        </>
    )
}
