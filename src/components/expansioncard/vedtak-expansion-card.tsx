import { BodyShort, ExpansionCard, Heading } from '@navikt/ds-react'
import React, { useContext } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'

export interface VedtakExpansionCard {
    vedtak: RSVedtakWrapper
    tittel: string
    undertittel?: string
    ariaLabel?: string
    children: React.ReactNode | React.ReactNode[]
}

export const VedtakExpansionCard = ({ vedtak, tittel, undertittel, children, ariaLabel }: VedtakExpansionCard) => {
    const arkivering = useContext(ArkiveringContext)

    const ugyldig = vedtak.annullert || vedtak.revurdert
    return (
        <ExpansionCard
            aria-label={ariaLabel ?? tittel}
            defaultOpen={arkivering}
            className="mt-4"
            style={
                {
                    '--ac-expansioncard-bg': ugyldig ? 'var(--a-gray-100)' : 'var(--a-surface-default)',
                    '--ac-expansioncard-border-color': ugyldig ? 'var(--a-gray-100)' : 'var(--a-border-default)',
                } as React.CSSProperties
            }
        >
            <ExpansionCard.Header>
                <Heading level="2" size="medium">
                    {tittel}
                    {undertittel && (
                        <BodyShort as="span" className="block">
                            {undertittel}
                        </BodyShort>
                    )}
                </Heading>
            </ExpansionCard.Header>
            <ExpansionCard.Content>{children}</ExpansionCard.Content>
        </ExpansionCard>
    )
}
