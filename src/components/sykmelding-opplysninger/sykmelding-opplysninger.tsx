import './opplysninger.less'

import React, { useEffect, useState } from 'react'

import { Sykmelding } from '../../types/types'
import { tekst } from '../../utils/tekster'
import Utvidbar from '../utvidbar/utvidbar'
import ArbeidsgiverInfo from './arbeidsgiver-info'
import ArbeidssituasjonInfo from './arbeidssituasjon-info'
import SykmeldingDato from './sykmelding-dato'
import ForsikringInfo from './sykmelding-forsikring'
import FravaersperioderInfo from './sykmelding-fravaersperioder'
import SykmeldingPerioder from './sykmelding-perioder'
import { useAppStore } from '../../data/stores/app-store';
import sjekkbokser from '../soknad-oppsummering/sjekkbokser.svg';
import sjekkbokserHover from '../soknad-oppsummering/sjekkbokser-hover.svg';
import Vis from '../vis';
import { sorterPerioderEldsteFoerst } from '../../utils/sykmelding-utils';

export interface OpplysningerProps {
    sykmelding: Sykmelding;
}

const SykmeldingOpplysninger = () => {
    const { valgtVedtak, sykmeldinger } = useAppStore()
    const [ vedtakSykmeldinger, setVedtakSykmeldinger ] = useState<Sykmelding[]>([])
    const [ apen ] = useState<boolean>(false)

    useEffect(() => {
        const hentSykmeldinger = (): Sykmelding[] => {
            const sykmeldingIder = valgtVedtak?.vedtak.dokumenter
                .filter(dok => dok.type === 'Sykmelding')
                .map(dok => dok.dokumentId)
            return sykmeldinger.filter(syk => sykmeldingIder?.includes(syk.id))
        }
        setVedtakSykmeldinger(hentSykmeldinger())
    }, [ sykmeldinger, valgtVedtak ])

    return (
        <Utvidbar className={'oppsummering ekspander lilla' + (apen ? ' apen' : '')}
            ikon={sjekkbokser} ikonHover={sjekkbokserHover} erApen={apen}
            tittel={tekst('sykepengesoknad.sykmelding-utdrag.tittel')}
            ikonAltTekst="" fixedHeight={true}
        >
            <Vis hvis={vedtakSykmeldinger.length === 1}>
                <DetaljVisning sykmelding={vedtakSykmeldinger[0]} />
            </Vis>

            <Vis hvis={vedtakSykmeldinger.length > 1}>
                {vedtakSykmeldinger.map((syk, idx) => {
                    const perioder = sorterPerioderEldsteFoerst(syk.mulighetForArbeid.perioder);
                    return (
                        <Utvidbar className={'oppsummering ekspander hvit' + (apen ? ' apen' : '')}
                            tittel={
                                tekst('din-sykmelding.periode.tittel') + ' ' +
                                perioder[perioder.length - 1].fom + ' - ' +
                                perioder[0].tom
                            }
                            ikonAltTekst="" type="intern" erApen={apen}
                        >
                            <DetaljVisning sykmelding={syk} key={idx} />
                        </Utvidbar>
                    )
                })}
            </Vis>
        </Utvidbar>
    )
}

export default SykmeldingOpplysninger

interface DetaljProps {
    sykmelding: Sykmelding;
}

const DetaljVisning = ({ sykmelding }: DetaljProps) => {
    return (
        <div className="opplysninger">
            <SykmeldingPerioder sykmelding={sykmelding} />
            <ArbeidsgiverInfo sykmelding={sykmelding} />
            <SykmeldingDato sykmelding={sykmelding} />
            <ArbeidssituasjonInfo sykmelding={sykmelding} />
            <FravaersperioderInfo sykmelding={sykmelding} />
            <ForsikringInfo sykmelding={sykmelding} />
        </div>
    )
}
