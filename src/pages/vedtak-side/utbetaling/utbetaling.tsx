import './utbetaling.less'

import React from 'react'

import HandImg from '../../../components/teaser/hand.svg'
import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'

interface UtbetalingerProps {
    ekspandert: boolean;
}

const Utbetaling = ({ ekspandert }: UtbetalingerProps) => {
    const { valgtVedtak } = useAppStore()
    const finnBelop = () => {
        return '12 580'
    }

    if (valgtVedtak === undefined) return null

    return (
        <Utvidbar className={'gronn' + (ekspandert ? ' apen' : '')}
            erApen={ekspandert}
            ikon={HandImg}
            ikonHover={HandImg}
            tittel={finnBelop() + ' kroner'}
            undertittel={tekst('vedtak.utbetaling.undertittel')}
            ikonAltTekst="">
            <div>
                Her kommer mer info
            </div>
        </Utvidbar>
    )
}

export default Utbetaling
