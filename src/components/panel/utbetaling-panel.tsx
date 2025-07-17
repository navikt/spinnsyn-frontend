import { BodyShort, Panel } from '@navikt/ds-react'
import React from 'react'

interface UtbetalingPanelProps {
    tittel: React.ReactNode
    erUgyldig: boolean
    children: React.ReactNode
    sectionLabel: string
    dataCy?: string
    avslag?: boolean
    delvisInnvilgelse?: boolean
}

const UtbetalingPanel = (props: UtbetalingPanelProps) => {
    return (
        <section aria-label={props.sectionLabel}>
            <Panel
                className="mt-4 rounded-md"
                border
                data-testid={`utbetaling-panel-${props.dataCy}${props.erUgyldig ? '-ugyldig' : ''}`}
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
