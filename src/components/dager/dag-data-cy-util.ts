import { RSDag } from '../../types/rs-types/rs-vedtak-felles'

function dataCyDag(dag: RSDag) {
    if (dag.dagtype == 'AvvistDag') {
        return dag.begrunnelser[0]
    }
    if (dag.dagtype == 'AndreYtelser') {
        return dag.begrunnelser[0]
    }
    return dag.dagtype
}

export function dataCyLabel(dag: RSDag) {
    return `dag-label-${dataCyDag(dag)}`
}

export function dataCyBeskrivelse(dag: RSDag) {
    return `dag-beskrivelse-${dataCyDag(dag)}`
}
