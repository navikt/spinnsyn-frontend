import './utbetaling.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import HandImg from '../../../components/teaser/hand.svg'
import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { refusjonTilArbeidsgiverBeløp } from '../../../utils/vedtak-utils'
import BeregningInfo from './beregningInfo/beregningInfo'
import FeilOpplysningerInfo from './feilOpplysningerInfo/feilOpplysningerInfo'
import InntektsmeldingOppsummering from './inntektsmeldingOppsummering/inntektsmeldingOppsummering'
import RefusjonInfo from './refusjonInfo/refusjonInfo'
import UtbetalingUtenInntektsmelding from './utbetaling-uten-inntektsmelding'

interface UtbetalingerProps {
    ekspandert: boolean;
}

const Utbetaling = ({ ekspandert }: UtbetalingerProps) => {
    const { valgtVedtak, valgtInntektsmelding } = useAppStore()
    const [ belop, setBelop ] = useState<string>('-')

    useEffect(() => {
        setBelop(ValutaFormat.format(refusjonTilArbeidsgiverBeløp(valgtVedtak)))
    }, [ valgtVedtak ])

    if (valgtVedtak === undefined) return null
    if (valgtInntektsmelding === undefined) return <UtbetalingUtenInntektsmelding ekspandert={ekspandert} />

    return (
        <Utvidbar className={'gronn' + (ekspandert ? ' apen' : '')}
            erApen={ekspandert}
            ikon={HandImg}
            ikonHover={HandImg}
            tittel={belop + ' kroner'}
            systemtittel={tekst('vedtak.utbetaling.systemtittel')}
            ikonAltTekst="">
            <div className="utbetaling__innhold">
                <InntektsmeldingOppsummering />
                <section>
                    <Normaltekst>
                        {tekst('vedtak.utbetaling.trekk')}
                    </Normaltekst>
                </section>
                <BeregningInfo />
                <FeilOpplysningerInfo />
                <RefusjonInfo />
            </div>
        </Utvidbar>
    )
}

export default Utbetaling
