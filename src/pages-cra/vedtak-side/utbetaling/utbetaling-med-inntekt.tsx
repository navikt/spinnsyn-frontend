import React, { useEffect, useState } from 'react'

import PengerIkon from '../../../../public/syk/sykepenger/static/img/ikon-penger.svg'
import DagBeskrivelse from '../../../components/dager/dag-beskrivelse'
import DagTabell from '../../../components/dager/dag-tabell'
import Utvidbar from '../../../components/utvidbar/utvidbar'
import Vis from '../../../components/vis'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import ArbeidsgiverInfo from './arbeidsgiver-info'
import BeregningInfo from './beregning-info'

const UtbetalingMedInntekt = () => {
    const { valgtVedtak } = useAppStore()
    const [ belop, setBelop ] = useState<string>('-')
    const [ apen ] = useState<boolean>(false)


    useEffect(() => {
        if (valgtVedtak) {
            setBelop(ValutaFormat.format(valgtVedtak.sykepengebelop))
        }
    }, [ valgtVedtak ])

    if (valgtVedtak === undefined) return null

    return (
        <Utvidbar type="integrert"
            className={'gronn' + (apen ? ' apen' : '')}
            erApen={apen}
            visLukk={true}
            ikon={'/syk/sykepenger/static/img/ikon-penger.svg'}
            ikonHover={'/syk/sykepenger/static/img/ikon-penger.svg'}
            tittel={belop + ' kroner'}
            systemtittel={tekst('utbetaling.systemtittel')}
            ikonAltTekst=""
            fixedHeight={true}
            heading="h2"
        >
            <div className="utbetaling__innhold">
                <ArbeidsgiverInfo />
                <BeregningInfo />
                <Vis hvis={valgtVedtak.vedtak.utbetaling.utbetalingsdager.length > 0}
                    render={() =>
                        <Utvidbar erApen={false} visLukk={true} type="intern" className="utbetalingsoversikt"
                            tittel={'Beløpet dag for dag'}
                        >
                            <DagTabell dager={valgtVedtak.dager} />
                            <DagBeskrivelse dager={valgtVedtak.dager} />
                        </Utvidbar>
                    }
                />
            </div>
        </Utvidbar>
    )
}

export default UtbetalingMedInntekt
