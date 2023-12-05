import { BodyLong, Heading } from '@navikt/ds-react'
import React from 'react'

import { LenkeMedAmplitude } from '../../lenke/lenke-med-amplitude'
import { VedtakProps } from '../vedtak'

export const SporsmalEllerFeil = ({ vedtak }: VedtakProps) => {
    const soknadsLenke = () => {
        const relatertSoknad = vedtak.vedtak.dokumenter.filter((dokument) => dokument.type === 'Søknad')
        if (relatertSoknad.length === 1) {
            return {
                url: '/syk/sykepengesoknad/sendt/' + relatertSoknad[0].dokumentId,
                cleanUrl: '/syk/sykepengesoknad/sendt/soknadsid',
            }
        }
        return { url: '/syk/sykepengesoknad' }
    }

    return (
        <>
            <Heading size="small" level="2">
                Spørsmål eller feil
            </Heading>
            <BodyLong spacing>
                {'Lurer du på noe eller har du funnet en feil i vedtaket, kan du '}
                <LenkeMedAmplitude url="https://www.nav.no/kontaktoss" tekst="kontakte NAV" />.
                {' Har du funnet en feil i vedtaket som skyldes feil i søknaden kan du endre dette selv ved å '}
                <LenkeMedAmplitude {...soknadsLenke()} tekst="endre svarene i søknaden" />.
            </BodyLong>
            <BodyLong spacing>
                {'Hvis du er usikker på om opplysningene om deg i '}
                <LenkeMedAmplitude url="/syk/sykefravaer/inntektsmeldinger" tekst="inntektsmeldingen" />
                {' fra arbeidsgiveren din er riktig, kontakt arbeidsgiveren din.'}
            </BodyLong>
        </>
    )
}
