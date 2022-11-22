import { Tag } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import React from 'react'

import { RSBegrunnelse, RSDag } from '../../types/rs-types/rs-vedtak'

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

            case 'NavDagDelvisSyk':
                if (skalViseProsent) {
                    const grad = dag.grad.toString()
                    return (
                        <Tag variant="success" size="small">
                            {grad}% syk
                        </Tag>
                    )
                }
                return (
                    <Tag variant="success" size="small">
                        Delvis&nbsp;syk
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
                        Arbeidsdag
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
                return dag.begrunnelser?.map((begrunnelse, idx) => lagBegrunnelseLabel(begrunnelse, idx))

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
        switch (begrunnelse) {
            case 'SykepengedagerOppbrukt':
            case 'SykepengedagerOppbruktOver67':
                return (
                    <Tag size="small" variant="warning" key={idx}>
                        Maks&nbsp;antall&nbsp;dager
                    </Tag>
                )

            case 'MinimumInntekt':
            case 'MinimumInntektOver67':
                return (
                    <Tag size="small" variant="warning" key={idx}>
                        For&nbsp;lav&nbsp;inntekt
                    </Tag>
                )

            case 'EgenmeldingUtenforArbeidsgiverperiode':
                return (
                    <Tag size="small" variant="warning" key={idx}>
                        Egenmelding
                    </Tag>
                )

            case 'MinimumSykdomsgrad':
                return (
                    <Tag size="small" variant="warning" key={idx}>
                        Sykmeldt&nbsp;i&nbsp;for&nbsp;liten&nbsp;grad
                    </Tag>
                )

            case 'ManglerOpptjening':
                return (
                    <Tag size="small" variant="warning" key={idx}>
                        Jobbet&nbsp;for&nbsp;kort
                    </Tag>
                )

            case 'ManglerMedlemskap':
                return (
                    <Tag size="small" variant="warning" key={idx}>
                        Ikke&nbsp;medlem
                    </Tag>
                )

            case 'Over70':
                return (
                    <Tag size="small" variant="warning" key={idx}>
                        Over&nbsp;70&nbsp;år
                    </Tag>
                )

            case 'EtterDødsdato':
                return (
                    <Tag size="small" variant="warning" key={idx}>
                        Etter&nbsp;dødsfall
                    </Tag>
                )

            case 'UKJENT':
            default:
                logger.warn(`Har ingen begrunnelse for: ${begrunnelse}`)
                return (
                    <Tag size="small" variant="warning" key={idx}>
                        Ukjent
                    </Tag>
                )
        }
    }

    return <>{lagDagLabel(dag)}</>
}

export default DagLabel
