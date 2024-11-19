import { BodyLong, Heading, BodyShort } from '@navikt/ds-react'
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
            <Heading size="small" level="2" spacing>
                Spørsmål eller feil
            </Heading>
            <BodyShort weight="semibold">Feil i vedtaket på grunn av feil i søknaden din?</BodyShort>
            <BodyLong spacing>
                Du kan endre dette selv ved å <LenkeMedAmplitude {...soknadsLenke()} tekst="endre svarene i søknaden" />
                . Da vil saken din bli vurdert på nytt.
            </BodyLong>
            {vedtak.vedtak.utbetaling.inntektFraAordning ? (
                <>
                    <BodyShort weight="semibold">Spørsmål til opplysninger hentet fra a-ordningen?</BodyShort>
                    <BodyLong spacing>
                        <LenkeMedAmplitude url="https://www.nav.no/kontaktoss" tekst="Ta kontakt med Nav" />.
                    </BodyLong>
                </>
            ) : (
                <>
                    <BodyShort weight="semibold">Spørsmål til opplysninger i inntektsmeldingen?</BodyShort>
                    <BodyLong spacing>Ta kontakt med arbeidsgiveren din</BodyLong>
                </>
            )}
            <BodyShort weight="semibold">Annet du lurer på?</BodyShort>
            <BodyLong spacing>
                <LenkeMedAmplitude url="https://www.nav.no/kontaktoss" tekst="Ta kontakt med Nav" />.
            </BodyLong>
        </>
    )
}
