import './utbetaling.less'

import React, { useEffect, useState } from 'react'

import DagBeskrivelse from '../../../components/dager/dag-beskrivelse'
import DagTabell from '../../../components/dager/dag-tabell'
import HandImg from '../../../components/teaser/hand.svg'
import Utvidbar from '../../../components/utvidbar/utvidbar'
import Vis from '../../../components/vis'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import ArbeidsgiverInfo from './arbeidsgiver-info'
import BeregningInfo from './beregning-info'
import FeilOpplysninger from './feil-opplysninger'
import InntektInfo from './inntekt-info/inntekt-info'

interface UtbetalingerProps {
    ekspandert: boolean;
}

const UtbetalingMedInntekt = ({ ekspandert }: UtbetalingerProps) => {
    const [ belop, setBelop ] = useState<string>('-')
    const { valgtVedtak } = useAppStore()

    useEffect(() => {
        if (valgtVedtak) {
            setBelop(ValutaFormat.format(valgtVedtak.sykepengebelop))
        }
    }, [ valgtVedtak ])

    if (valgtVedtak === undefined) return null

    return (
        <Utvidbar type="integrert"
            className={'gronn' + (ekspandert ? ' apen' : '')}
            erApen={ekspandert}
            visLukk={true}
            ikon={HandImg}
            ikonHover={HandImg}
            tittel={belop + ' kroner'}
            systemtittel={tekst('utbetaling.systemtittel')}
            ikonAltTekst=""
            fixedHeight={true}
            heading="h2"
        >
            <div className="utbetaling__innhold">
                <ArbeidsgiverInfo />
                <InntektInfo />
                <Vis hvis={valgtVedtak.vedtak.utbetaling.utbetalingsdager.length > 0}
                    render={() =>
                        <Utvidbar erApen={false} visLukk={true} type="intern" className="utbetalingsoversikt"
                            tittel={'Daglig utbetalingsoversikt'}
                        >
                            <DagTabell dager={valgtVedtak.dager} />
                            <DagBeskrivelse dager={valgtVedtak.dager} />
                        </Utvidbar>
                    }
                />
                <BeregningInfo />
                <FeilOpplysninger />
            </div>
        </Utvidbar>
    )
}

export default UtbetalingMedInntekt
