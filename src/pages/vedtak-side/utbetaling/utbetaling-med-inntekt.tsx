import './utbetaling.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import HandImg from '../../../components/teaser/hand.svg'
import Utvidbar from '../../../components/utvidbar/utvidbar'
import Vis2 from '../../../components/vis'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { refusjonTilArbeidsgiverTotalBeløp } from '../../../utils/vedtak-utils'
import ArbeidsgiverInfo from './arbeidsgiver-info'
import BeregningInfo from './beregning-info'
import DagTabell from './dag-tabell'
import FeilOpplysninger from './feil-opplysninger'
import InntektInfo from './inntekt-info/inntekt-info'

interface UtbetalingerProps {
    ekspandert: boolean;
}

const UtbetalingMedInntekt = ({ ekspandert }: UtbetalingerProps) => {
    const { valgtVedtak } = useAppStore()
    const [ belop, setBelop ] = useState<string>('-')

    useEffect(() => {
        setBelop(ValutaFormat.format(refusjonTilArbeidsgiverTotalBeløp(valgtVedtak)))
    }, [ valgtVedtak ])

    if (valgtVedtak === undefined) return null

    return (
        <Utvidbar className={'gronn' + (ekspandert ? ' apen' : '')}
            erApen={ekspandert}
            visLukk={true}
            ikon={HandImg}
            ikonHover={HandImg}
            tittel={belop + ' kroner'}
            systemtittel={tekst('utbetaling.systemtittel')}
            ikonAltTekst=""
            fixedHeight={true}
        >
            <div className="utbetaling__innhold">
                <ArbeidsgiverInfo />
                <InntektInfo />
                <Normaltekst>
                    {tekst('utbetaling.trekk')}
                </Normaltekst>
                <Vis2 hvis={valgtVedtak.vedtak.utbetaling.utbetalingsdager.length > 0}
                    render={() =>
                        <DagTabell />
                    }
                />
                <BeregningInfo />
                <FeilOpplysninger />
            </div>
        </Utvidbar>
    )
}

export default UtbetalingMedInntekt
