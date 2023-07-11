import { BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'
import { EnvelopeOpenIcon } from '@navikt/aksel-icons'

import { VedtakProps } from '../vedtak'
import { VedtakExpansionCard } from '../../expansioncard/vedtak-expansion-card'

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
                    <BodyLong spacing>
                        Når årsinntekten avviker med mer enn 25 prosent fra rapportert inntekt, skal NAV fastsette
                        sykepengegrunnlaget ved skjønn ut fra den årsinntekten som kan godtgjøres på det tidspunktet du
                        ble syk. Det fremgår av folketrygdloven § 8-30 andre ledd.
                    </BodyLong>
                    <BodyLong spacing>
                        Beløpet vi har kommet frem til er årsinntekten vi mener du ville hatt hvis du ikke hadde blitt
                        syk.
                    </BodyLong>
                </>
            )}

            <Heading level="3" size="small">
                <EnvelopeOpenIcon aria-hidden={true} className="mr-2 inline" />
                Nærmere begrunnelse fra saksbehandler
            </Heading>
            <BodyShort className="bg-surface-subtle p-4">{begrunnelse.begrunnelse}</BodyShort>
        </VedtakExpansionCard>
    )
}
