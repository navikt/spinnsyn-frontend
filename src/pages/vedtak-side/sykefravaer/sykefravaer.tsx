import './sykefravaer.less'

import React from 'react'

import HandImg from '../../../components/teaser/hand.svg'
import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'

interface UtbetalingerProps {
    ekspandert: boolean;
}

const Sykefravaer = ({ ekspandert }: UtbetalingerProps) => {
    const { valgtVedtak } = useAppStore()

    if (valgtVedtak === undefined) return null

    return (
        <Utvidbar className={'oppsummering ekspander hvit' + (ekspandert ? ' apen' : '')}
            erApen={ekspandert} ikon={HandImg} ikonHover={HandImg}
            tittel={tekst('vedtak.sykefravaer.tittel')} ikonAltTekst=""
        >
            <div className="utbetaling__innhold">
                {valgtVedtak.vedtak.fom}
            </div>
        </Utvidbar>
    )
}

export default Sykefravaer
