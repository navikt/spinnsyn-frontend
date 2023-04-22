import { Panel } from '@navikt/ds-react'
import React from 'react'

interface UtbetalingPanelProps {
    tittel: React.ReactNode
    erUgyldig: boolean
    children: React.ReactNode
    dataCy?: string
}

const UtbetalingPanel = (props: UtbetalingPanelProps) => {
    return (
        <Panel
            className={`mt-4 rounded-md`}
            data-cy={`${props.erUgyldig && 'ugyldig'} ${props.dataCy}`}
            style={
                {
                    '--ac-panel-bg': props.erUgyldig ? 'var(--a-gray-100)' : 'var(--a-green-100)',
                } as React.CSSProperties
            }
        >
            <div className={'mb-4'}>{props.tittel}</div>

            {props.children}
        </Panel>
    )
}

export default UtbetalingPanel
