import dayjs from 'dayjs'
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { Sykmelding, SykmeldingPeriode } from '../../types/types'
import { getDuration } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'

interface SykmeldingPerioderProps {
    sykmelding: Sykmelding;
}

// TODO: Hentet fra sykepengesok, endre å legg inn i util fil
const sorterPerioderEldsteFoerst = (perioder: SykmeldingPeriode[]) => {
    return perioder.sort((a: SykmeldingPeriode, b: SykmeldingPeriode) => {
        if (s2d(a.fom).getTime() !== s2d(b.fom).getTime()) {
            return s2d(a.fom).getTime() - s2d(b.fom).getTime()
        }
        return s2d(a.tom).getTime() - s2d(b.tom).getTime()
    })
}

const s2d = (datostreng: any) => {
    const dato: Date = dayjs(datostreng).toDate()
    return dato
}

const SykmeldingPerioder = ({ sykmelding }: SykmeldingPerioderProps) => {
    if (!sykmelding) {
        return null
    }

    return (
        <div className="sykmelding-perioder">
            {sorterPerioderEldsteFoerst(sykmelding.mulighetForArbeid.perioder).map((periode: SykmeldingPeriode, index: number) => {
                const fom = dayjs(periode.fom).format('D. MMM')
                const tom = dayjs(periode.tom).format('D. MMM YYYY')
                const dager = getDuration(new Date(periode.fom), new Date(periode.tom)) + ' dager'

                return (
                    <div className="avsnitt" key={index}>
                        <EtikettLiten tag="h3"
                            className="avsnitt-hode">{tekst('din-sykmelding.periode.tittel')}</EtikettLiten>
                        <Normaltekst><strong>{fom} - {tom}</strong> &bull; {dager}</Normaltekst>
                        <Vis hvis={periode.grad}>
                            <Normaltekst>
                                {periode.grad} {tekst('din-sykmelding.periode.prosent-sykmeldt')}
                            </Normaltekst>
                        </Vis>
                        <Vis hvis={periode.behandlingsdager}>
                            <Normaltekst>
                                <Vis hvis={periode.behandlingsdager! > 1}>
                                    {periode.behandlingsdager} {tekst('din-sykmelding.periode.behandlingsdager')}
                                </Vis>
                                <Vis hvis={periode.behandlingsdager! === 1}>
                                    {tekst('din-sykmelding.periode.behandlingsdag')}
                                </Vis>
                            </Normaltekst>
                        </Vis>
                    </div>
                )
            })}
        </div>
    )
}

export default SykmeldingPerioder
