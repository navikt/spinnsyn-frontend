import dayjs from 'dayjs'

import { RSDag } from '../types/rs-types/rs-vedtak-felles'

export function finnFaktiskFom({
    dagerArbeidsgiver,
    dagerPerson,
    opprinneligFom,
}: {
    dagerArbeidsgiver: RSDag[]
    dagerPerson: RSDag[]
    opprinneligFom: string
}): string {
    const combinedDager = [...dagerArbeidsgiver, ...dagerPerson]
    const tidligsteDagerDag = combinedDager.reduce((min, dag) => {
        return dayjs(dag.dato).isBefore(dayjs(min.dato)) ? dag : min
    }, combinedDager[0])

    if (tidligsteDagerDag && dayjs(tidligsteDagerDag.dato).isAfter(dayjs(opprinneligFom))) {
        return tidligsteDagerDag.dato
    }
    return opprinneligFom
}
