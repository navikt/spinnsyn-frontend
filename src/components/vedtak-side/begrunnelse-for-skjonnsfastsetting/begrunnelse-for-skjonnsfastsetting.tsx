import { BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'
import { EnvelopeOpenIcon } from '@navikt/aksel-icons'

import { VedtakProps } from '../vedtak'
import { VedtakExpansionCard } from '../../expansioncard/vedtak-expansion-card'

import { begrunnelseForSkjønnsfastsettingTekster } from './begrunnelse-for-skjonnsfastsetting-tekster'

export const BegrunnelseForSkjonnsfastsetting = ({ vedtak }: VedtakProps) => {
    const begrunnelse = vedtak.vedtak.begrunnelser?.find((b) => b.årsak === 'SkjønnsfastsattSykepengegrunnlag')
    if (!begrunnelse) return null
    const har25prosenAvvikt =
        vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt == 'EtterSkjønn' &&
        vedtak.vedtak.sykepengegrunnlagsfakta?.avviksprosent > 25
    return (
        <VedtakExpansionCard tittel="Begrunnelse for skjønnsfastsetting" vedtak={vedtak}>
            {har25prosenAvvikt && (
                <>
                    <BodyLong spacing>{begrunnelseForSkjønnsfastsettingTekster['25%-del-1']}</BodyLong>
                    <BodyLong spacing>{begrunnelseForSkjønnsfastsettingTekster['25%-del-2']}</BodyLong>
                </>
            )}

            <Heading level="3" size="small">
                <EnvelopeOpenIcon aria-hidden className="mr-2 inline" />
                {begrunnelseForSkjønnsfastsettingTekster['nærmere-begrunnelse-fra-saksbehandler']}
            </Heading>
            <BodyShort className="bg-surface-subtle p-4">{begrunnelse.begrunnelse}</BodyShort>
        </VedtakExpansionCard>
    )
}
