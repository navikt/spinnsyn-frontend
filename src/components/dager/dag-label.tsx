import Etikett from 'nav-frontend-etiketter'
import React from 'react'

import { RSBegrunnelse, RSDag } from '../../types/rs-types/rs-vedtak'
import { logger } from '../../utils/logger'

interface DagLabelProps {
    dag: RSDag
    skalViseProsent?: Boolean
}

const DagLabel = ({ dag, skalViseProsent = false }: DagLabelProps) => {
    const lagDagLabel = (dag: RSDag) => {
        // TODO: Legg inn permisjon og ferie når vi mottar denne dataen
        switch (dag.dagtype) {
            case 'NavDagSyk':
                return <Etikett mini type="suksess">Syk</Etikett>
            case 'NavDagDelvisSyk':
                if (skalViseProsent) {
                    return <Etikett mini type="suksess">{dag.grad}% syk</Etikett>
                }
                return <Etikett mini type="suksess">Delvis syk</Etikett>
            case 'NavHelgDag':
                return <Etikett mini type="info">Helg</Etikett>
            case 'ArbeidsgiverperiodeDag':
                return <Etikett mini type="info">Arbeidsgiver betaler</Etikett>
            case 'Arbeidsdag':
                return <Etikett mini type="info">Arbeidsdag</Etikett>
            case 'Fridag':
                return <Etikett mini type="fokus">Fridag</Etikett>
            case 'ForeldetDag':
                return <Etikett mini type="fokus">Søkt for sent</Etikett>
            case 'AvvistDag':
                return dag.begrunnelser?.map((begrunnelse) =>
                    lagBegrunnelseLabel(begrunnelse)
                )
            case 'UkjentDag':
            default:
                return <Etikett mini type="info">Ukjent</Etikett>
        }
    }

    const lagBegrunnelseLabel = (begrunnelse: RSBegrunnelse) => {
        switch (begrunnelse) {
            case 'SykepengedagerOppbrukt':
                return <Etikett mini type="fokus">Maks antall dager</Etikett>
            case 'MinimumInntekt':
                return <Etikett mini type="fokus">For lav inntekt</Etikett>
            case 'EgenmeldingUtenforArbeidsgiverperiode':
                return <Etikett mini type="fokus">Egenmelding</Etikett>
            case 'MinimumSykdomsgrad':
                return <Etikett mini type="fokus">Sykmeldt i for liten grad</Etikett>
            case 'ManglerOpptjening':
                return <Etikett mini type="fokus">Jobbet for kort</Etikett>
            case 'ManglerMedlemskap':
                return <Etikett mini type="fokus">Ikke medlem</Etikett>
            case 'EtterDødsdato':
                return <Etikett mini type="fokus">Etter dødsfall</Etikett>
            case 'UKJENT':
            default:
                logger.warn(`Har ingen begrunnelse for: ${begrunnelse}`)
                return <Etikett mini type="fokus">Ukjent</Etikett>
        }
    }

    return (
        <>
            { lagDagLabel(dag) }
        </>
    )
}

export default DagLabel
