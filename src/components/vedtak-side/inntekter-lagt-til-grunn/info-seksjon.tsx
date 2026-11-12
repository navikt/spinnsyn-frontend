import React, { ReactNode } from 'react'
import { BodyShort } from '@navikt/ds-react'

import { cn } from '../../../utils/tw-utils'

interface InfoSectionProps {
    label: ReactNode
    ariaLabel?: string
    value: string
    className?: string
    bold?: boolean
    size?: 'small' | 'medium' | 'large'
}

export const InfoSection: React.FC<InfoSectionProps> = ({
    ariaLabel,
    label,
    value,
    className,
    bold = false,
    size = 'small',
}) => {
    return (
        <section
            aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
            className={cn('arkivering-flex-fix flex justify-between', className)}
        >
            <BodyShort as="div" size={size} spacing className={cn({ 'font-ax-bold': bold })}>
                {label}
            </BodyShort>
            <BodyShort as="div" size={size} className={cn({ 'font-ax-bold': bold })}>
                {value}
            </BodyShort>
        </section>
    )
}
