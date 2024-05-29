import { BodyShort, Panel } from '@navikt/ds-react'
import React from 'react'

const BlåttPanel = (props: {
    tittel: React.ReactNode
    erUgyldig: boolean
    children: React.ReactNode
    sectionLabel: string
    dataCy?: string
    avslag?: boolean
    delvisInnvilgelse?: boolean
}) => {
    return (
        <section aria-label={props.sectionLabel}>
            <Panel
                className="mt-4 rounded-md"
                border
                data-cy={`utbetaling-panel-${props.dataCy}${props.erUgyldig ? '-ugyldig' : ''}`}
                style={
                    {
                        '--ac-panel-bg': props.erUgyldig ? 'var(--a-gray-100)' : 'var(--a-lightblue-100)',
                    } as React.CSSProperties
                }
            >
                <div className="mb-4">
                    {props.avslag && (
                        <BodyShort size="small" weight="semibold">
                            Avslått vedtak
                        </BodyShort>
                    )}
                    {props.delvisInnvilgelse && (
                        <BodyShort size="small" weight="semibold">
                            Delvis innvilget vedtak
                        </BodyShort>
                    )}
                    {props.tittel}
                </div>
                {props.children}
            </Panel>
        </section>
    )
}

export default BlåttPanel
