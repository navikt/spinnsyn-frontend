import { BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'
import { EnvelopeOpenIcon } from '@navikt/aksel-icons'

import { VedtakProps } from '../vedtak'
import { VedtakExpansionCard } from '../../expansioncard/vedtak-expansion-card'

export const BegrunnelseForSkjonnsfastsetting = ({ vedtak }: VedtakProps) => {
    const malBegrunnelse = vedtak.vedtak.begrunnelser?.find((b) => b.type === 'SkjønnsfastsattSykepengegrunnlagMal')
    if (!malBegrunnelse) return null
    if (vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt != 'EtterSkjønn') return null

    const fritekstBegrunnelse = vedtak.vedtak.begrunnelser?.find(
        (b) => b.type === 'SkjønnsfastsattSykepengegrunnlagFritekst',
    )
    return (
        <VedtakExpansionCard tittel="Begrunnelse for skjønnsfastsetting" vedtak={vedtak}>
            {malBegrunnelse.begrunnelse.split('\n').map((tekst, idx) => (
                <BodyLong spacing key={idx}>
                    {tekst}
                </BodyLong>
            ))}
            {fritekstBegrunnelse && fritekstBegrunnelse.begrunnelse && (
                <>
                    <Heading level="3" size="small">
                        <EnvelopeOpenIcon aria-hidden className="mr-2 inline" />
                        Nærmere begrunnelse fra saksbehandler
                    </Heading>
                    <BodyShort className="bg-surface-subtle p-4">{fritekstBegrunnelse.begrunnelse}</BodyShort>
                </>
            )}
        </VedtakExpansionCard>
    )
}
