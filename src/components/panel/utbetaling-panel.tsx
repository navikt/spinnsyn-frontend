import { BodyShort, Box } from '@navikt/ds-react'
import React, { useEffect } from 'react'

import { logEvent } from '../umami/umami'

interface UtbetalingPanelProps {
    tittel: React.ReactNode
    erUgyldig: boolean
    children: React.ReactNode
    sectionLabel: string
    dataTestId?: string
    avslag?: boolean
    delvisInnvilgelse?: boolean
}

const UtbetalingPanel = (props: UtbetalingPanelProps) => {
    const innvilgetMerke = props.avslag
        ? 'Søknaden er avslått'
        : props.delvisInnvilgelse
          ? 'Søknaden er delvis innvilget'
          : 'Søknaden er innvilget'

    useEffect(() => {
        logEvent('vedtak av type åpnet', {
            tittel: innvilgetMerke,
            component: 'UtbetalingPanel',
        })
    }, [innvilgetMerke])

    return (
        <section aria-label={props.sectionLabel}>
            <Box
                padding="4"
                borderWidth="1"
                borderRadius="small"
                className="mt-4 rounded-md"
                data-testid={`utbetaling-panel-${props.dataTestId}${props.erUgyldig ? '-ugyldig' : ''}`}
                background={props.erUgyldig ? 'surface-subtle' : 'surface-info-subtle'}
            >
                <div className="mb-4">
                    <BodyShort size="small" weight="semibold">
                        {innvilgetMerke}
                    </BodyShort>
                    {props.tittel}
                </div>
                {props.children}
            </Box>
        </section>
    )
}

export default UtbetalingPanel
