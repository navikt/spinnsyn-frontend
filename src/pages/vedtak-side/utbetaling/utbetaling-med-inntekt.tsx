import './utbetaling.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import HandImg from '../../../components/teaser/hand.svg'
import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { refusjonTilArbeidsgiverBeløp } from '../../../utils/vedtak-utils'
import BeregningInfo from './beregning-info/beregning-info'
import FeilOpplysninger from './feil-opplysninger/feil-opplysninger'
import InntektInfo from './inntekt-info/inntekt-info'
import RefusjonInfo from './refusjon-info/refusjon-info'
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
        >
            <div className="utbetaling__innhold">
                <InntektInfo />
                <Normaltekst>
                    {tekst('utbetaling.trekk')}
                </Normaltekst>
                <BeregningInfo />
                <FeilOpplysninger />
                <RefusjonInfo />
            </div>
        </Utvidbar>
    )
}

export default UtbetalingMedInntekt
