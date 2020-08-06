import { Soknad, Sporsmal, Sykmelding, SykmeldingPeriode, TidsPeriode } from '../types/types'
import { dayjsToDate, fraBackendTilDate } from './dato-utils'

export const tidligsteFom = (perioder: TidsPeriode[]) => {
    if (perioder.length === 0) {
        return null
    }

    return perioder.map((p) => {
        return p.fom
    }).sort((p1, p2) => {
        if (p1 > p2) {
            return 1
        } else if (p1 < p2) {
            return -1
        }
        return 0
    })[0]
}

export const senesteTom = (perioder: TidsPeriode[]) => {
    if (perioder.length === 0) {
        return null
    }
    return perioder.map((p) => {
        return p.tom
    }).sort((p1, p2) => {
        if (p1 < p2) {
            return 1
        } else if (p1 > p2) {
            return -1
        }
        return 0
    })[0]
}

export const erOppdelt = (soknad: Soknad, sykmelding: Sykmelding) => {
    if (!sykmelding) {
        return false
    }

    const tilTidsperiode = (p: SykmeldingPeriode) => {
        return {
            fom: dayjsToDate(p.fom)!,
            tom: dayjsToDate(p.tom)!
        }
    }
    const tomSykmelding = senesteTom(sykmelding.mulighetForArbeid.perioder.map(tilTidsperiode))!
    const fomSykmelding = tidligsteFom(sykmelding.mulighetForArbeid.perioder.map(tilTidsperiode))!

    return !(soknad.fom!.getTime() === fomSykmelding.getTime()
        && soknad.tom!.getTime() === tomSykmelding.getTime())
}

export const hentPeriode = (sporsmal: Sporsmal, index: number) => {
    const svar = sporsmal.svarliste.svar[index]
    const periode: Date[] = []
    if (svar === undefined) {
        return periode
    }
    const datoer = JSON.parse(svar.verdi)
    return [ fraBackendTilDate(datoer.fom), fraBackendTilDate(datoer.tom) ]
}
