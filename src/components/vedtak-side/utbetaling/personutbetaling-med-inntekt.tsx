import React, { useState } from 'react'

import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import Utvidbar from '../../utvidbar/utvidbar'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'
import BeregningInfo from './beregning-info'
import { PersonutbetalingInfo } from './personutbetaling-info'


export const PersonutbetalingMedInntekt = ({ vedtak }: VedtakProps) => {
    const [ apen ] = useState<boolean>(false)

    const belop = ValutaFormat.format(vedtak.sykepengebelopPerson)


    return (
        <Utvidbar type="integrert"
            className={'personutbetaling blokkinfo gronn' + (apen ? ' apen' : '')}
            erApen={apen}
            visLukk={true}
            ikon={'/syk/sykepenger/static/img/ikon-penger.svg'}
            ikonHover={'/syk/sykepenger/static/img/ikon-penger.svg'}
            tittel={belop + ' kroner'}
            systemtittel={tekst('utbetaling.person.systemtittel')}
            ikonAltTekst=""
            fixedHeight={true}
            heading="h2"
        >
            <div className="utbetaling__innhold">
                <PersonutbetalingInfo vedtak={vedtak} />

                <Vis hvis={vedtak.dagerPerson.length > 0}
                    render={() =>
                        <Utvidbar erApen={false} visLukk={true} type="intern" className="utbetalingsoversikt"
                            tittel={'Sykepengene dag for dag'}
                        >
                            <DagTabell dager={vedtak.dagerPerson} />
                            <DagBeskrivelse dager={vedtak.dagerPerson} />
                        </Utvidbar>
                    }
                />

                <BeregningInfo vedtak={vedtak} mottaker={'person'} />
            </div>
        </Utvidbar>
    )
}


