import React, { useState } from 'react'

import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import Utvidbar from '../../utvidbar/utvidbar'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'
import { ArbeidsgiverInfo } from './arbeidsgiver-info'
import BeregningInfo from './beregning-info'


const RefusjonMedInntekt = ({ vedtak }: VedtakProps) => {
    const [ apen ] = useState<boolean>(false)

    const belop = ValutaFormat.format(vedtak.sykepengebelopArbeidsgiver)


    return (
        <Utvidbar type="integrert"
            className={'refusjon gronn' + (apen ? ' apen' : '')}
            erApen={apen}
            visLukk={true}
            ikon={'/syk/sykepenger/static/img/ikon-penger.svg'}
            ikonHover={'/syk/sykepenger/static/img/ikon-penger.svg'}
            tittel={belop + ' kroner'}
            systemtittel={tekst('utbetaling.arbeidsgiver.systemtittel')}
            ikonAltTekst=""
            fixedHeight={true}
            heading="h2"
        >
            <div className="utbetaling__innhold">
                <ArbeidsgiverInfo vedtak={vedtak} />
                <BeregningInfo vedtak={vedtak} mottaker={'refusjon'} />
                <Vis hvis={vedtak.dagerArbeidsgiver.length > 0}
                    render={() =>
                        <Utvidbar erApen={false} visLukk={true} type="intern" className="utbetalingsoversikt"
                            tittel={'Beløpet dag for dag'}
                        >
                            <DagTabell dager={vedtak.dagerArbeidsgiver} />
                            <DagBeskrivelse dager={vedtak.dagerArbeidsgiver} />
                        </Utvidbar>
                    }
                />
            </div>
        </Utvidbar>
    )
}

export default RefusjonMedInntekt
