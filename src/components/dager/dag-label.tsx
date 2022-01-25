import { Tag } from '@navikt/ds-react'
import React from 'react'

import { RSBegrunnelse, RSDag } from '../../types/rs-types/rs-vedtak'
import { logger } from '../../utils/logger'

interface DagLabelProps {
    dag: RSDag
    skalViseProsent?: Boolean
}

const DagLabel = ({ dag, skalViseProsent = false }: DagLabelProps) => {
    const lagDagLabel = (dag: RSDag) => {
        switch (dag.dagtype) {
            case 'NavDag':
            case 'NavDagSyk':
                return <Tag variant="success" size="small">Syk</Tag>

            case 'NavDagDelvisSyk':
                if (skalViseProsent) {
                    return <Tag variant="success" size="small">{dag.grad}% syk</Tag>
                }
                return <Tag variant="success" size="small">Delvis syk</Tag>

            case 'NavHelgDag':
                return <Tag size="small" variant="info">Helg</Tag>

            case 'ArbeidsgiverperiodeDag':
                return <Tag size="small" variant="info">Arbeidsgiveren betaler</Tag>

            case 'Arbeidsdag':
                return <Tag size="small" variant="info">Arbeidsdag</Tag>

            case 'Fridag':
                return <Tag size="small" variant="warning">Fridag</Tag>

            case 'Feriedag':
                return <Tag size="small" variant="warning">Ferie</Tag>

            case 'Permisjonsdag':
                return <Tag size="small" variant="warning">Permisjon</Tag>

            case 'ForeldetDag':
                return <Tag size="small" variant="warning">Søkt for sent</Tag>

            case 'AvvistDag':
                return dag.begrunnelser?.map((begrunnelse, idx) =>
                    lagBegrunnelseLabel(begrunnelse, idx)
                )

            case 'UkjentDag':

            default:
                return <Tag size="small" variant="info">Ukjent</Tag>
        }
    }

    const lagBegrunnelseLabel = (begrunnelse: RSBegrunnelse, idx: number) => {
        switch (begrunnelse) {
            case 'SykepengedagerOppbrukt':
            case 'SykepengedagerOppbruktOver67':
                return <Tag size="small" variant="warning" key={idx}>Maks antall dager</Tag>

            case 'MinimumInntekt':
            case 'MinimumInntektOver67':
                return <Tag size="small" variant="warning" key={idx}>For lav inntekt</Tag>

            case 'EgenmeldingUtenforArbeidsgiverperiode':
                return <Tag size="small" variant="warning" key={idx}>Egenmelding</Tag>

            case 'MinimumSykdomsgrad':
                return <Tag size="small" variant="warning" key={idx}>Sykmeldt i for liten grad</Tag>

            case 'ManglerOpptjening':
                return <Tag size="small" variant="warning" key={idx}>Jobbet for kort</Tag>

            case 'ManglerMedlemskap':
                return <Tag size="small" variant="warning" key={idx}>Ikke medlem</Tag>

            case 'Over70':
                return <Tag size="small" variant="warning" key={idx}>Over 70 år</Tag>

            case 'EtterDødsdato':
                return <Tag size="small" variant="warning" key={idx}>Etter dødsfall</Tag>

            case 'UKJENT':
            default:
                logger.warn(`Har ingen begrunnelse for: ${begrunnelse}`)
                return <Tag size="small" variant="warning" key={idx}>Ukjent</Tag>
        }
    }

    return (
        <>
            { lagDagLabel(dag) }
        </>
    )
}

export default DagLabel
