import './sykepengedager.less'

import React, { useEffect } from 'react'

import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import LedningImg from '../lokale-lenker/ledning.svg'

interface UtbetalingerProps {
    ekspandert: boolean;
}

const Sykepengedager = ({ ekspandert }: UtbetalingerProps) => {
    const { valgtVedtak } = useAppStore()

    useEffect(() => {
        // console.log('hei'); // eslint-disable-line
    }, [])

    if (valgtVedtak === undefined) return null

    return (
        <Utvidbar className={'oppsummering ekspander hvit' + (ekspandert ? ' apen' : '')}
            erApen={ekspandert} ikon={LedningImg} ikonHover={LedningImg}
            tittel={tekst('vedtak.sykmeldt.tittel')} ikonAltTekst=""
        >
            <div className="utbetaling__innhold">
                {valgtVedtak.vedtak.fom}
            </div>
        </Utvidbar>
    )
}

export default Sykepengedager
