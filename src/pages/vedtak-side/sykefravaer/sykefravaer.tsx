import './sykefravaer.less'

import React from 'react'

import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import HandImg from '../../../components/teaser/hand.svg'

interface UtbetalingerProps {
    ekspandert: boolean;
}

const Sykefravaer = ({ ekspandert }: UtbetalingerProps) => {
    const { valgtVedtak, apenSykefravaer } = useAppStore()

    if (valgtVedtak === undefined) return null

    return (
        <Utvidbar className={'oppsummering ekspander hvit' + (ekspandert ? ' apen' : '')}
            erApen={apenSykefravaer} ikon={HandImg} ikonHover={HandImg}
            tittel={tekst('vedtak.sykefravaer.tittel')} ikonAltTekst=""
        >
            <div className="utbetaling__innhold">
                {valgtVedtak.vedtak.fom}
            </div>
        </Utvidbar>
    )
}

export default Sykefravaer
