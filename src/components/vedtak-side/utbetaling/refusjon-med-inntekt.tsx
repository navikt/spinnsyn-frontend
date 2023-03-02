import { Accordion, BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import UtbetalingPanel from '../../panel/utbetaling-panel'

import { ArbeidsgiverInfo } from './arbeidsgiver-info'
import BeregningInfo from './accordion/beregning-info'
import { SykepengerPerDag } from './accordion/sykepenger-per-dag'
import InntektInfo from './accordion/inntekt-info/inntekt-info'

const RefusjonMedInntekt = ({ vedtak }: VedtakProps) => {
    const belop = ValutaFormat.format(vedtak.sykepengebelopArbeidsgiver)

    return (
        <UtbetalingPanel
            tittel={
                <Heading size="large" level="2">
                    {belop + ' kroner'}
                    <BodyShort as="span">
                        {getLedetekst(tekst('utbetaling.arbeidsgiver.systemtittel'), {
                            '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn),
                        })}
                    </BodyShort>
                </Heading>
            }
            erUgyldig={vedtak.revurdert || vedtak.annullert}
            dataCy="refusjon"
        >
            <>
                <VedtakPeriode vedtak={vedtak} />

                <ArbeidsgiverInfo vedtak={vedtak} />

                <Accordion>
                    <InntektInfo vedtak={vedtak} />
                    <SykepengerPerDag dager={vedtak.dager} />
                    <BeregningInfo vedtak={vedtak} mottaker={'refusjon'} />
                </Accordion>
            </>
        </UtbetalingPanel>
    )
}

export default RefusjonMedInntekt
