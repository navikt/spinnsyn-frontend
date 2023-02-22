import { Panel } from '@navikt/ds-react'
import React from 'react'

import styles from './utbetaling-panel.module.css'

interface UtbetalingPanelProps {
    tittel: React.ReactNode
    erUgyldig: boolean
    children: React.ReactNode
    dataCy?: string
}

const UtbetalingPanel = (props: UtbetalingPanelProps) => {
    function erUgyldig() {
        if (props.erUgyldig) {
            return ` ${styles.ugyldig}`
        }
        return ''
    }

    return (
        <Panel
            className={styles.panelWrapper + erUgyldig()}
            data-cy={`${props.erUgyldig && 'ugyldig'} ${props.dataCy}`}
        >
            <div className={styles.heading}>
                <img
                    aria-hidden="true"
                    src="/syk/sykepenger/static/img/ikon-ekspander-gronn.svg"
                    alt=""
                    className={styles.image}
                />
                <div>{props.tittel}</div>
            </div>
            <div className={styles.content}>{props.children}</div>
        </Panel>
    )
}

export default UtbetalingPanel
