import './utbetaling.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import HandImg from '../../../components/teaser/hand.svg'
import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { refusjonTilArbeidsgiverBeløp } from '../../../utils/vedtak-utils'
import ArbeidsgiverInfo from './arbeidsgiver-info'
import BeregningInfo from './beregning-info'
import FeilOpplysninger from './feil-opplysninger'
import InntektInfo from './inntekt-info/inntekt-info'
import UtbetalingUtenInntekt from './utbetaling-uten-inntekt'

interface UtbetalingerProps {
    ekspandert: boolean;
}

const UtbetalingMedInntekt = ({ ekspandert }: UtbetalingerProps) => {
    const { valgtVedtak, valgtInntektsmelding } = useAppStore()
    const [ belop, setBelop ] = useState<string>('-')

    useEffect(() => {
        setBelop(ValutaFormat.format(refusjonTilArbeidsgiverBeløp(valgtVedtak)))
    }, [ valgtVedtak ])

    if (valgtVedtak === undefined) return null
    if (valgtInntektsmelding === undefined) return <UtbetalingUtenInntekt ekspandert={ekspandert} />

    return (
        <Utvidbar className={'gronn' + (ekspandert ? ' apen' : '')}
            erApen={ekspandert}
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
                <BeregningInfo />
                <FeilOpplysninger />
            </div>
        </Utvidbar>
    )
}

export default UtbetalingMedInntekt
