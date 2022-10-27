import { Accordion, BodyShort, Heading } from '@navikt/ds-react'
import React, { useContext, useRef, useState } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import { ekspanderbarKlikk } from '../../ekspanderbar/ekspander-utils'
import Ekspanderbar from '../../ekspanderbar/ekspanderbar'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'

import { ArbeidsgiverInfo } from './arbeidsgiver-info'
import BeregningInfo from './beregning-info'

const RefusjonMedInntekt = ({ vedtak }: VedtakProps) => {
    const [apen] = useState<boolean>(false)
    const isServer = useContext(ArkiveringContext)
    const [open, setOpen] = useState<boolean>(isServer)
    const belop = ValutaFormat.format(vedtak.sykepengebelopArbeidsgiver)
    const accordionRef = useRef(null)

    const onButtonClick = () => {
        ekspanderbarKlikk(open, accordionRef, 'Sykepenger per dag')
        setOpen(!open)
    }

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
                    <Vis
                        hvis={vedtak.dagerArbeidsgiver.length > 0}
                        render={() => (
                            <Accordion.Item ref={accordionRef} open={open} className="utbetalingsoversikt">
                                <Accordion.Header onClick={onButtonClick}>
                                    <Heading size="small" level="4">
                                        {tekst('utbetaling.inntekt.info.dagsats')}
                                    </Heading>
                                </Accordion.Header>
                                <Accordion.Content>
                                    <DagTabell dager={vedtak.dagerArbeidsgiver} />

                                    <DagBeskrivelse dager={vedtak.dagerArbeidsgiver} />
                                </Accordion.Content>
                            </Accordion.Item>
                        )}
                    />
                    <BeregningInfo vedtak={vedtak} mottaker={'refusjon'} />
                </Accordion>
            </>
        </Ekspanderbar>
    )
}

export default RefusjonMedInntekt
