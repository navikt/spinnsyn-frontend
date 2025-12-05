import { Tag } from '@navikt/ds-react'
import React from 'react'

type EtikettProps = {
    etikettVariant?: EtikketVariant
    size?: 'medium' | 'small' | 'xsmall'
    className?: string
}

export enum EtikketVariant {
    ANNULLERT = 'ANNULLERT',
    NYESTE_REVURDERING = 'NYESTE_REVURDERING',
    REVURDERT = 'REVURDERT',
}

export function getEtikettVariant(
    annullert: boolean,
    revurdert: boolean,
    nyesteRevurdering: boolean,
): EtikketVariant | null {
    if (annullert) {
        return EtikketVariant.ANNULLERT
    } else if (revurdert) {
        return EtikketVariant.REVURDERT
    } else if (nyesteRevurdering) {
        return EtikketVariant.NYESTE_REVURDERING
    }
    return null
}

export const Etikett = ({ etikettVariant, size, className }: EtikettProps) => {
    switch (etikettVariant) {
        case EtikketVariant.ANNULLERT:
            return null
        case EtikketVariant.REVURDERT:
            return (
                <Tag size={size} variant="neutral" className={className}>
                    Erstattet med nytt svar
                </Tag>
            )
        case EtikketVariant.NYESTE_REVURDERING:
            return (
                <Tag size={size} variant="info" className={className}>
                    Nytt svar
                </Tag>
            )
    }
}
