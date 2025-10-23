import { BodyShort, Panel } from '@navikt/ds-react'
import React, { useEffect } from 'react'

import { logEvent } from '../amplitude/amplitude'

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
    }, [innvilgetMerke, props])

    return (
        <section aria-label={props.sectionLabel}>
            <Panel
                className="mt-4 rounded-md"
                border
                data-testid={`utbetaling-panel-${props.dataTestId}${props.erUgyldig ? '-ugyldig' : ''}`}
                style={
                    {
                        '--ac-panel-bg': props.erUgyldig ? 'var(--a-gray-100)' : 'var(--a-lightblue-100)',
                    } as React.CSSProperties
                }
            >
                <div className="mb-4">
                    <BodyShort size="small" weight="semibold">
                        {innvilgetMerke}
                    </BodyShort>
                    {props.tittel}
                </div>
                {props.children}
            </Panel>
        </section>
    )
}

export default UtbetalingPanel
