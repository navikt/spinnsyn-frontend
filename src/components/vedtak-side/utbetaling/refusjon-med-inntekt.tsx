import { Accordion, BodyShort, Heading } from '@navikt/ds-react'
import React, { useState } from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import Ekspanderbar from '../../ekspanderbar/ekspanderbar'
import { VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'

import { ArbeidsgiverInfo } from './arbeidsgiver-info'
import BeregningInfo from './accordion/beregning-info'
import { SykepengerPerDag } from './accordion/sykepenger-per-dag'
import InntektInfo from './accordion/inntekt-info/inntekt-info'

const RefusjonMedInntekt = ({ vedtak }: VedtakProps) => {
    const [apen] = useState<boolean>(false)
    const belop = ValutaFormat.format(vedtak.sykepengebelopArbeidsgiver)

    return (
        <Ekspanderbar
            type="gronn"
            erUgyldig={vedtak.revurdert || vedtak.annullert}
            ikon="/syk/sykepenger/static/img/ikon-ekspander-gronn.svg"
            className="refusjon"
            erApen={apen}
            tittel={
                <div className="ekspanderbar__tittel">
                    <Heading size="large" level="2">
                        {belop + ' kroner'}
                        <BodyShort spacing as="span">
                            {getLedetekst(tekst('utbetaling.arbeidsgiver.systemtittel'), {
                                '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn),
                            })}
                        </BodyShort>
                    </Heading>
                </div>
            }
        >
            <>
                <VedtakPeriode vedtak={vedtak} />

                <ArbeidsgiverInfo vedtak={vedtak} />

                <Accordion>
                    <InntektInfo vedtak={vedtak} />
                    <SykepengerPerDag dager={vedtak.dagerArbeidsgiver} />
                    <BeregningInfo vedtak={vedtak} mottaker={'refusjon'} />
                </Accordion>
            </>
        </Ekspanderbar>
    )
}

export default RefusjonMedInntekt
