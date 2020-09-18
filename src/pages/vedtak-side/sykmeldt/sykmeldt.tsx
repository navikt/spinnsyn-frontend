import './sykmeldt.less'

import React from 'react'

import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import LedningImg from '../lokale-lenker/ledning.svg'

interface UtbetalingerProps {
    ekspandert: boolean;
}

const Sykmeldt = ({ ekspandert }: UtbetalingerProps) => {
    const { valgtVedtak, apenSykmeldt } = useAppStore()

    if (valgtVedtak === undefined) return null

    return (
        <Utvidbar className={'oppsummering ekspander hvit' + (ekspandert ? ' apen' : '')}
            erApen={apenSykmeldt} ikon={LedningImg} ikonHover={LedningImg}
            tittel={tekst('vedtak.sykmeldt.tittel')} ikonAltTekst=""
        >
            <div className="utbetaling__innhold">
                {valgtVedtak.vedtak.fom}
            </div>
        </Utvidbar>
    )
}

export default Sykmeldt
