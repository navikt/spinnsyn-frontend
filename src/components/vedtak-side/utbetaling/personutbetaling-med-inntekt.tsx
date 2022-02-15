import { BodyShort, Heading } from '@navikt/ds-react'
import React, { useState } from 'react'

import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import Ekspanderbar from '../../ekspanderbar/ekspanderbar'
import { VedtakProps } from '../vedtak'
import { PersonutbetalingInfo } from './personutbetaling-info'

export const PersonutbetalingMedInntekt = ({ vedtak }: VedtakProps) => {
    const [ apen ] = useState<boolean>(true)
    const belop = ValutaFormat.format(vedtak.sykepengebelopPerson)
    const periode = tilLesbarPeriodeMedArstall(vedtak?.vedtak.fom, vedtak?.vedtak.tom)

    return (
        <Ekspanderbar type="gronn"
            ikon="/syk/sykepenger/static/img/ikon-ekspander-gronn.svg"
            className="personutbetaling"
            erApen={apen}
            tittel={
                <div className="ekspanderbar__tittel">
                    <Heading level="2" size="large">
                        {belop + ' kroner'}
                    </Heading>
                    <BodyShort spacing size="small">
                        <strong>{tekst('utbetaling.person.systemtittel')}</strong>
                    </BodyShort>
                </div>
            }
        >
            <div className="arbgiver_periode">
                <BodyShort spacing size="small">
                    {getLedetekst(tekst('utbetaling.person.fra'), {
                        '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn)
                    })}
                </BodyShort>
                <BodyShort spacing size="small">
                    Periode: {periode}
                </BodyShort>
            </div>

            <PersonutbetalingInfo vedtak={vedtak} />
        </Ekspanderbar>
    )
}


