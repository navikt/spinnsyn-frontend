import { Accordion, BodyShort, Button, Heading } from '@navikt/ds-react'
import React, { useContext, useRef, useState } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import { ekspanderbarKlikk } from '../../ekspanderbar/ekspander-utils'
import Ekspanderbar from '../../ekspanderbar/ekspanderbar'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import BeregningInfo from './beregning-info'
import { PersonutbetalingInfo } from './personutbetaling-info'

export const PersonutbetalingMedInntekt = ({ vedtak }: VedtakProps) => {
    const [ apen ] = useState<boolean>(false)
    const isServer = useContext(ArkiveringContext)
    const [ open, setOpen ] = useState<boolean>(isServer)
    const accordionRef = useRef(null)

    const belop = ValutaFormat.format(vedtak.sykepengebelopPerson)

    const onButtonClick = () => {
        ekspanderbarKlikk(open, accordionRef, 'Sykepenger per dag')
        setOpen(!open)
    }

    return (
        <Ekspanderbar type="gronn" erUgyldig={vedtak.revurdert || vedtak.annullert}
            ikon="/syk/sykepenger/static/img/ikon-ekspander-gronn.svg"
            className="personutbetaling"
            erApen={apen}
            tittel={
                <div className="ekspanderbar__tittel">
                    <Heading level="2" size="large">
                        {belop + ' kroner'}
                    </Heading>
                    <BodyShort>
                        {tekst('utbetaling.person.systemtittel')}
                    </BodyShort>
                </div>
            }
        >
            <VedtakPeriode vedtak={vedtak} />

            <PersonutbetalingInfo vedtak={vedtak} />

            <Accordion>
                <Vis hvis={vedtak.dagerPerson.length > 0}
                    render={() =>
                        <Accordion.Item ref={accordionRef} open={open} className="utbetalingsoversikt">
                            <Accordion.Header onClick={onButtonClick}>
                                <Heading size="small" level="4">
                                    {tekst('utbetaling.inntekt.info.dagsats')}
                                </Heading>
                            </Accordion.Header>
                            <Accordion.Content>
                                <DagTabell dager={vedtak.dagerPerson} />

                                <DagBeskrivelse dager={vedtak.dagerPerson} />

                                <div className="knapperad">
                                    <Button variant="tertiary" size="small" onClick={onButtonClick}>
                                        Skjul
                                    </Button>
                                </div>
                            </Accordion.Content>
                        </Accordion.Item>
                    }
                />
                <BeregningInfo vedtak={vedtak} mottaker={'person'} />
            </Accordion>

        </Ekspanderbar>
    )
}


