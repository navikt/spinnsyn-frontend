import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import Ekspanderbar from '../../ekspanderbar/ekspanderbar'
import EkspanderbarIntern from '../../ekspanderbar/ekspanderbar-intern'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'
import BeregningInfo from './beregning-info'
import { PersonutbetalingInfo } from './personutbetaling-info'

export const PersonutbetalingMedInntekt = ({ vedtak }: VedtakProps) => {
    const [ apen ] = useState<boolean>(false)
    const belop = ValutaFormat.format(vedtak.sykepengebelopPerson)

    return (
        <Ekspanderbar type="gronn"
            className="personutbetaling"
            erApen={apen}
            tittel={
                <div className="ekspanderbar__tittel">
                    <Systemtittel tag="h2">
                        {tekst('utbetaling.person.systemtittel')}
                    </Systemtittel>
                    <Normaltekst>{belop + ' kroner'}</Normaltekst>
                </div>
            }
        >
            <>
                <PersonutbetalingInfo vedtak={vedtak} />

                <Vis hvis={vedtak.dagerPerson.length > 0}
                    render={() =>
                        <EkspanderbarIntern erApen={false} className="utbetalingsoversikt"
                            tittel={'Sykepengene dag for dag'}
                        >
                            <DagTabell dager={vedtak.dagerPerson} />
                            <DagBeskrivelse dager={vedtak.dagerPerson} />
                        </EkspanderbarIntern>
                    }
                />
                <BeregningInfo vedtak={vedtak} mottaker={'person'} />
            </>
        </Ekspanderbar>
    )
}


