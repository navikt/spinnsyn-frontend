import React, { ReactNode } from 'react'
import { BodyShort } from '@navikt/ds-react'

import { cn } from '../../../utils/tw-utils'

interface InfoSectionProps {
    label: ReactNode
    ariaLabel?: string
    value: string
    className?: string
    bold?: boolean
}

export const InfoSection: React.FC<InfoSectionProps> = ({ ariaLabel, label, value, className, bold = false }) => {
    return (
        <section
            aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
            className={cn('arkivering-flex-fix flex justify-between', className)}
        >
            <BodyShort as="div" size="small" spacing className={cn({ 'font-bold': bold })}>
                {label}
            </BodyShort>
            <BodyShort as="div" size="small" className={cn({ 'font-bold': bold })}>
                {value}
            </BodyShort>
        </section>
    )
}
