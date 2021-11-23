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
            case 'NavDag':
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
                return <Etikett mini type="info">Arbeidsgiveren betaler</Etikett>

            case 'Arbeidsdag':
                return <Etikett mini type="info">Arbeidsdag</Etikett>

            case 'Fridag':
                return <Etikett mini type="fokus">Fridag</Etikett>

            case 'Feriedag':
                return <Etikett mini type="fokus">Feriedag</Etikett>

            case 'Permisjonsdag':
                return <Etikett mini type="fokus">Permisjon</Etikett>

            case 'ForeldetDag':
                return <Etikett mini type="fokus">Søkt for sent</Etikett>

            case 'AvvistDag':
                return dag.begrunnelser?.map((begrunnelse, idx) =>
                    lagBegrunnelseLabel(begrunnelse, idx)
                )

            case 'UkjentDag':

            default:
                return <Etikett mini type="info">Ukjent</Etikett>
        }
    }

    const lagBegrunnelseLabel = (begrunnelse: RSBegrunnelse, idx: number) => {
        switch (begrunnelse) {
            case 'SykepengedagerOppbrukt':
            case 'SykepengedagerOppbruktOver67':
                return <Etikett mini type="fokus" key={idx}>Maks antall dager</Etikett>

            case 'MinimumInntekt':
            case 'MinimumInntektOver67':
                return <Etikett mini type="fokus" key={idx}>For lav inntekt</Etikett>

            case 'EgenmeldingUtenforArbeidsgiverperiode':
                return <Etikett mini type="fokus" key={idx}>Egenmelding</Etikett>

            case 'MinimumSykdomsgrad':
                return <Etikett mini type="fokus" key={idx}>Sykmeldt i for liten grad</Etikett>

            case 'ManglerOpptjening':
                return <Etikett mini type="fokus" key={idx}>Jobbet for kort</Etikett>

            case 'ManglerMedlemskap':
                return <Etikett mini type="fokus" key={idx}>Ikke medlem</Etikett>

            case 'Over70':
                return <Etikett mini type="fokus" key={idx}>Over 70 år</Etikett>

            case 'EtterDødsdato':
                return <Etikett mini type="fokus" key={idx}>Etter dødsfall</Etikett>

            case 'UKJENT':
            default:
                logger.warn(`Har ingen begrunnelse for: ${begrunnelse}`)
                return <Etikett mini type="fokus" key={idx}>Ukjent</Etikett>
        }
    }

    return (
        <>
            { lagDagLabel(dag) }
        </>
    )
}

export default DagLabel
