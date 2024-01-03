import { Panel } from '@navikt/ds-react'
import React from 'react'

interface UtbetalingPanelProps {
    tittel: React.ReactNode
    erUgyldig: boolean
    children: React.ReactNode
    sectionLabel: string
    dataCy?: string
}

const UtbetalingPanel = (props: UtbetalingPanelProps) => {
    return (
        <section aria-label={props.sectionLabel}>
            <Panel
                className="mt-4 rounded-md"
                border
                data-cy={`utbetaling-panel-${props.dataCy}${props.erUgyldig ? '-ugyldig' : ''}`}
                style={
                    {
                        '--ac-panel-bg': props.erUgyldig ? 'var(--a-gray-100)' : 'var(--a-green-100)',
                    } as React.CSSProperties
                }
            >
                <div className="mb-4">{props.tittel}</div>

                {props.children}
            </Panel>
        </section>
    )
}

export default UtbetalingPanel
