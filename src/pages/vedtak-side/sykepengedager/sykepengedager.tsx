import './sykepengedager.less'

import React, { useEffect } from 'react'

import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import LedningImg from '../lokale-lenker/ledning.svg'
import { Normaltekst } from 'nav-frontend-typografi';

interface UtbetalingerProps {
    ekspandert: boolean;
}

const Sykepengedager = ({ ekspandert }: UtbetalingerProps) => {
    const { valgtVedtak } = useAppStore()

    const calculateSickDays = () => {
        return 258;
    }

    useEffect(() => {
        // console.log('hei'); // eslint-disable-line
    }, [])

    if (valgtVedtak === undefined) return null

    return (
        <Utvidbar className={'oppsummering ekspander hvit' + (ekspandert ? ' apen' : '')}
            erApen={ekspandert} ikon={LedningImg} ikonHover={LedningImg}
            tittel={calculateSickDays()} ikonAltTekst=""
        >
            <Normaltekst className="utbetaling__innhold">
                Hei på deg
                {tekst('vedtak.sykmeldt.undertittel')}
            </Normaltekst>
        </Utvidbar>
    )
}

export default Sykepengedager
