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

const getTittelType = (props: UtbetalingPanelProps) => {
    switch (true) {
        case props.avslag:
            return 'Avslått søknad'
        case props.delvisInnvilgelse:
            return 'Delvis innvilget søknad'
        default:
            return 'Utbetaling (innvilget søknad)'
    }
}

const UtbetalingPanel = (props: UtbetalingPanelProps) => {
    useEffect(() => {
        logEvent('vedtak av type åpnet', {
            tittel: getTittelType(props),
            component: 'UtbetalingPanel',
        })
    }, [props])

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
                    {props.avslag && (
                        <BodyShort size="small" weight="semibold">
                            Avslått søknad
                        </BodyShort>
                    )}
                    {props.delvisInnvilgelse && (
                        <BodyShort size="small" weight="semibold">
                            Delvis innvilget søknad
                        </BodyShort>
                    )}
                    {props.tittel}
                </div>
                {props.children}
            </Panel>
        </section>
    )
}

export default UtbetalingPanel
