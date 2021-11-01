import React, { useEffect, useState } from 'react'

import { ServerVedtakProps } from '../../../pages/server-vedtak'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import Utvidbar from '../../utvidbar/utvidbar'
import Vis from '../../vis'
import ArbeidsgiverInfo from './arbeidsgiver-info'
import BeregningInfo from './beregning-info'

const UtbetalingMedInntekt = ({ vedtak }: ServerVedtakProps) => {
    const [ belop, setBelop ] = useState<string>('-')
    const [ apen ] = useState<boolean>(false)


    useEffect(() => {
        if (vedtak) {
            setBelop(ValutaFormat.format(vedtak.sykepengebelop))
        }
    }, [ vedtak ])

    if (vedtak === undefined) return null

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
                <Vis hvis={vedtak.vedtak.utbetaling.utbetalingsdager.length > 0}
                    render={() =>
                        <Utvidbar erApen={false} visLukk={true} type="intern" className="utbetalingsoversikt"
                            tittel={'Beløpet dag for dag'}
                        >
                            <DagTabell dager={vedtak.dager} />
                            <DagBeskrivelse dager={vedtak.dager} />
                        </Utvidbar>
                    }
                />
            </div>
        </Utvidbar>
    )
}

export default UtbetalingMedInntekt
