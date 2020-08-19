import './soknad-oppsummering.less'

import React, { useEffect, useState } from 'react'

import { TagTyper } from '../../types/enums'
import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Soknad, Sporsmal } from '../../types/types'
import { tekst } from '../../utils/tekster'
import Utvidbar from '../utvidbar/utvidbar'
import Behandlingsdager from './utdrag/behandlingsdager'
import CheckboxGruppe from './utdrag/checkbox-gruppe'
import CheckboxSum from './utdrag/checkbox-sum'
import DatoSum from './utdrag/dato-sum'
import Fritekst from './utdrag/fritekst'
import JaEllerNei from './utdrag/ja-eller-nei'
import LandSum from './utdrag/land-sum'
import PerioderSum from './utdrag/perioder-sum'
import RadioGruppe from './utdrag/radio-gruppe'
import TallSum from './utdrag/tall-sum'
import UndertekstSum from './utdrag/undertekst-sum'
import sjekkbokser from './sjekkbokser.svg';
import sjekkbokserHover from './sjekkbokser-hover.svg';
import { useAppStore } from '../../data/stores/app-store';
import Vis from '../vis';
import dayjs from 'dayjs';

export interface OppsummeringProps {
    sporsmal: Sporsmal;
}

const SoknadOppsummering = () => {
    const { valgtVedtak, soknader } = useAppStore()
    const [ vedtakSoknader, setVedtakSoknader ] = useState<Soknad[]>([])
    const [ apen ] = useState<boolean>(false)

    useEffect(() => {
        const hentSoknader = (): Soknad[] => {
            const soknadIder = valgtVedtak?.vedtak.dokumenter
                .filter(dok => dok.type === 'Søknad')
                .map(dok => dok.dokumentId)
            return soknader.filter(sok => soknadIder?.includes(sok.id))
        }
        setVedtakSoknader(hentSoknader())
    }, [ soknader, valgtVedtak ])

    return (
        <Utvidbar className={'oppsummering ekspander lilla' + (apen ? ' apen' : '')}
            ikon={sjekkbokser} ikonHover={sjekkbokserHover} erApen={apen}
            tittel={tekst('sykepengesoknad.oppsummering.tittel')}
            ikonAltTekst="" fixedHeight={true}
        >

            <Vis hvis={vedtakSoknader.length === 1}>
                <SporsmalVisning soknad={vedtakSoknader[0]} />
            </Vis>

            <Vis hvis={vedtakSoknader.length > 1}>
                {vedtakSoknader.map((soknad, idx) => {
                    return (
                        <Utvidbar className={'oppsummering ekspander hvit' + (apen ? ' apen' : '')}
                            tittel={
                                tekst('din-sykmelding.periode.tittel') + ' ' +
                                dayjs(soknad.fom).format('DD.MM.YYYY') + ' - ' +
                                dayjs(soknad.tom).format('DD.MM.YYYY')
                            }
                            ikonAltTekst="" type="intern" erApen={apen}
                        >
                            <SporsmalVisning soknad={soknad} key={idx} />
                        </Utvidbar>
                    )
                })}
            </Vis>
        </Utvidbar>
    )
}

export default SoknadOppsummering

interface VisningsProps {
    soknad: Soknad;
}

const SporsmalVisning = ({ soknad }: VisningsProps) => {
    const visning = soknad!.sporsmal
        .filter((sporsmal) => {
            return skalVisesIOppsummering(sporsmal)
        })
        .map((sporsmal, index) => {
            return (
                <div className="oppsummering__seksjon" key={index}>
                    <SporsmalVarianter sporsmal={sporsmal} />
                </div>
            )
        })
    return <>{visning}</>;
}

export const SporsmalVarianter = ({ sporsmal }: OppsummeringProps) => {
    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX_PANEL:
        case RSSvartype.CHECKBOX: {
            return <CheckboxSum sporsmal={sporsmal} />
        }
        case RSSvartype.JA_NEI: {
            return <JaEllerNei sporsmal={sporsmal} />
        }
        case RSSvartype.DATO: {
            return <DatoSum sporsmal={sporsmal} />
        }
        case RSSvartype.PERIODER: {
            return <PerioderSum sporsmal={sporsmal} />
        }
        case RSSvartype.FRITEKST: {
            return <Fritekst sporsmal={sporsmal} />
        }
        case RSSvartype.LAND: {
            return <LandSum sporsmal={sporsmal} />
        }
        case RSSvartype.IKKE_RELEVANT: {
            return <UndertekstSum sporsmal={sporsmal} />
        }
        case RSSvartype.CHECKBOX_GRUPPE: {
            return (<CheckboxGruppe sporsmal={sporsmal} />)
        }
        case RSSvartype.TALL:
        case RSSvartype.PROSENT:
        case RSSvartype.TIMER: {
            return <TallSum sporsmal={sporsmal} />
        }
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
        case RSSvartype.RADIO_GRUPPE: {
            return <RadioGruppe sporsmal={sporsmal} />
        }
        case RSSvartype.INFO_BEHANDLINGSDAGER: {
            return <Behandlingsdager sporsmal={sporsmal} />
        }
        default: {
            return null
        }
    }
}

function skalVisesIOppsummering(sporsmal: Sporsmal) {
    switch (sporsmal.tag) {
        case TagTyper.VAER_KLAR_OVER_AT:
        case TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO:
        case TagTyper.IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON: {
            return false
        }
        default: {
            return true
        }
    }
}
