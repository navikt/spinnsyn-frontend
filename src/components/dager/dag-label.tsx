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
                const grad = dag.grad.toString()
                return (
                    <Tag data-color="success" variant="outline" size="small">
                        {skalViseProsent ? grad + ' % syk' : 'Syk'}
                    </Tag>
                )

            case 'NavHelgDag':
                return (
                    <Tag data-color="info" size="small" variant="outline">
                        Helg
                    </Tag>
                )

            case 'ArbeidsgiverperiodeDag':
                return (
                    <Tag data-color="info" size="small" variant="outline">
                        Arbeidsgiverperiode
                    </Tag>
                )

            case 'Arbeidsdag':
                return (
                    <Tag data-color="info" size="small" variant="outline">
                        Ikke sykmeldt
                    </Tag>
                )

            case 'Feriedag':
                return (
                    <Tag data-color="warning" size="small" variant="outline">
                        Ferie
                    </Tag>
                )

            case 'Permisjonsdag':
                return (
                    <Tag data-color="warning" size="small" variant="outline">
                        Permisjon
                    </Tag>
                )

            case 'ForeldetDag':
                return (
                    <Tag data-color="warning" size="small" variant="outline">
                        Søkt for sent
                    </Tag>
                )

            case 'AvvistDag':
            case 'AndreYtelser':
                return dag.begrunnelser?.map((begrunnelse, idx) => lagBegrunnelseLabel(begrunnelse, idx))

            case 'Ventetidsdag':
                return (
                    <Tag data-color="info" size="small" variant="outline">
                        Dekkes ikke av Nav
                    </Tag>
                )

            case 'UkjentDag':

            default:
                return (
                    <Tag data-color="info" size="small" variant="outline">
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
                <Tag data-color="warning" size="small" variant="outline" key={idx}>
                    Ukjent
                </Tag>
            )
        }
        return (
            <Tag data-color="warning" size="small" variant="outline" key={idx}>
                {tagText.split(' ').map((word, index) => (
                    <React.Fragment key={index}>{word}&nbsp;</React.Fragment>
                ))}
            </Tag>
        )
    }

    return <div data-testid={dataCyLabel(dag)}>{lagDagLabel(dag)}</div>
}
export default DagLabel
