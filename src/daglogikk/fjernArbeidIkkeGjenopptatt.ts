import { RSDag } from '../types/rs-types/rs-vedtak-felles'

export function fjernArbeidIkkeGjenopptattDager(dager: RSDag[]): RSDag[] {
    return dager.filter((dag) => dag.dagtype !== 'ArbeidIkkeGjenopptattDag')
}
