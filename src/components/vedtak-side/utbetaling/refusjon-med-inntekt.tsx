import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import UtbetalingPanel from '../../panel/utbetaling-panel'

import { ArbeidsgiverInfo } from './arbeidsgiver-info'

// det er denne vi endrer på
const RefusjonMedInntekt = ({ vedtak }: VedtakProps) => {
    const belop = ValutaFormat.format(vedtak.sykepengebelopArbeidsgiver)
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert

    return (
        <UtbetalingPanel
            sectionLabel="Refusjon til arbeidsgiver"
            tittel={
                <Heading level="2" size="large">
                    <span className={annullertEllerRevurdert ? 'line-through' : undefined}>{belop + ' kroner'}</span>
                    <BodyShort as="span" className="block">
                        {getLedetekst(tekst('utbetaling.arbeidsgiver.systemtittel'), {
                            '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn),
                        })}
                    </BodyShort>
                </Heading>
            }
            erUgyldig={vedtak.revurdert || vedtak.annullert}
            dataCy="refusjon"
        >
            <VedtakPeriode vedtak={vedtak} />
            <ArbeidsgiverInfo vedtak={vedtak} />
        </UtbetalingPanel>
    )
}

export default RefusjonMedInntekt
