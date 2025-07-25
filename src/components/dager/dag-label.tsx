import { Tag } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import React from 'react'

import { RSBegrunnelse, RSDag } from '../../types/rs-types/rs-vedtak-felles'
import { finnBegrunnelseTekst } from '../../utils/vedtak-utils'

import { dataCyLabel } from './dag-data-cy-util'

interface DagLabelProps {
    dag: RSDag
    skalViseProsent?: boolean
}

const DagLabel = ({ dag, skalViseProsent = false }: DagLabelProps) => {
    const lagDagLabel = (dag: RSDag) => {
        switch (dag.dagtype) {
            case 'NavDag':
            case 'NavDagSyk':
                return (
                    <Tag variant="success" size="small">
                        Syk
                    </Tag>
                )

            case 'NavDagDelvisSykUnder20':
            case 'NavDagDelvisSyk':
                if (skalViseProsent) {
                    const grad = dag.grad.toString()
                    return (
                        <Tag variant="success" size="small">
                            {grad} % syk
                        </Tag>
                    )
                }
                const under20 = dag.dagtype == 'NavDagDelvisSykUnder20' ? ' under 20%' : ''
                return (
                    <Tag variant="success" size="small">
                        Delvis&nbsp;syk{under20}
                    </Tag>
                )

            case 'NavHelgDag':
                return (
                    <Tag size="small" variant="info">
                        Helg
                    </Tag>
                )

            case 'ArbeidsgiverperiodeDag':
                return (
                    <Tag size="small" variant="info">
                        Arbeidsgiveren&nbsp;betaler
                    </Tag>
                )

            case 'Arbeidsdag':
                return (
                    <Tag size="small" variant="info">
                        Ikke sykmeldt
                    </Tag>
                )

            case 'Fridag':
                return (
                    <Tag size="small" variant="warning">
                        Fridag
                    </Tag>
                )

            case 'Feriedag':
                return (
                    <Tag size="small" variant="warning">
                        Ferie
                    </Tag>
                )

            case 'Permisjonsdag':
                return (
                    <Tag size="small" variant="warning">
                        Permisjon
                    </Tag>
                )

            case 'ForeldetDag':
                return (
                    <Tag size="small" variant="warning">
                        Søkt&nbsp;for&nbsp;sent
                    </Tag>
                )

            case 'AvvistDag':
            case 'AndreYtelser':
                return dag.begrunnelser?.map((begrunnelse, idx) => lagBegrunnelseLabel(begrunnelse, idx))

            case 'DekkesIkkeAvNav':
                return (
                    <Tag variant="warning" size="small">
                        Dekkes ikke av NAV
                    </Tag>
                )

            case 'UkjentDag':

            default:
                return (
                    <Tag size="small" variant="info">
                        Ukjent
                    </Tag>
                )
        }
    }

    const lagBegrunnelseLabel = (begrunnelse: RSBegrunnelse, idx: number) => {
        const tagText = finnBegrunnelseTekst(begrunnelse)
        if (tagText === 'Ukjent') {
            logger.warn(`Har ingen begrunnelse for: ${begrunnelse}.`)
            return (
                <Tag size="small" variant="warning" key={idx}>
                    Ukjent
                </Tag>
            )
        }
        return (
            <Tag size="small" variant="warning" key={idx}>
                {tagText.split(' ').map((word, index) => (
                    <React.Fragment key={index}>{word}&nbsp;</React.Fragment>
                ))}
            </Tag>
        )
    }

    return <div data-testid={dataCyLabel(dag)}>{lagDagLabel(dag)}</div>
}
export default DagLabel
