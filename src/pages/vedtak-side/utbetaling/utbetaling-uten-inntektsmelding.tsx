import './utbetaling.less'

import parser from 'html-react-parser'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import HandImg from '../../../components/teaser/hand.svg'
import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { refusjonTilArbeidsgiverBeløp } from '../../../utils/vedtak-utils'
import RefusjonInfo from './refusjonInfo/refusjonInfo'

interface UtbetalingerProps {
    ekspandert: boolean;
}

const UtbetalingUtenInntektsmelding = ({ ekspandert }: UtbetalingerProps) => {
    const { valgtVedtak } = useAppStore()
    const [ belop, setBelop ] = useState<string>('-')

    useEffect(() => {
        setBelop(ValutaFormat.format(refusjonTilArbeidsgiverBeløp(valgtVedtak)))
    }, [ valgtVedtak ])

    if (valgtVedtak === undefined) return null

    return (
        <Utvidbar className={'gronn' + (ekspandert ? ' apen' : '')}
            erApen={ekspandert}
            ikon={HandImg}
            ikonHover={HandImg}
            tittel={belop + ' kroner'}
            systemtittel={tekst('vedtak.utbetaling.undertittel')}
            ikonAltTekst="">
            <div className="utbetaling__innhold">
                <section>
                    <Normaltekst>
                        {tekst('vedtak.utbetaling.trekk')}
                    </Normaltekst>
                </section>
                <section>
                    <Utvidbar erApen={false} tittel="Hvordan beregnes beløpet?" type="intern" className="typo-normal">
                        {parser(tekst('vedtak.utbetaling.hvordan'))}
                    </Utvidbar>
                </section>
                <RefusjonInfo />
            </div>
        </Utvidbar>
    )
}

export default UtbetalingUtenInntektsmelding
