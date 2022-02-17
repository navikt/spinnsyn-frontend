import { Accordion, BodyShort, Heading } from '@navikt/ds-react'
import React, { useRef, useState } from 'react'

import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import Ekspanderbar from '../../ekspanderbar/ekspanderbar'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'
import BeregningInfo from './beregning-info'
import { PersonutbetalingInfo } from './personutbetaling-info'
import { ekspanderbarKlikk } from '../../ekspanderbar/ekspander-utils';

export const PersonutbetalingMedInntekt = ({ vedtak }: VedtakProps) => {
    const [ apen ] = useState<boolean>(true)
    const [ open, setOpen ] = useState<boolean>(true)
    const accordionRef = useRef(null)

    const belop = ValutaFormat.format(vedtak.sykepengebelopPerson)
    const periode = tilLesbarPeriodeMedArstall(vedtak?.vedtak.fom, vedtak?.vedtak.tom)

    const onButtonClick = () => {
        ekspanderbarKlikk(open, accordionRef, 'Sykepenger per dag')
        setOpen(!open)
    }

    return (
        <Ekspanderbar type="gronn"
            ikon="/syk/sykepenger/static/img/ikon-ekspander-gronn.svg"
            className="personutbetaling"
            erApen={apen}
            tittel={
                <div className="ekspanderbar__tittel">
                    <Heading level="2" size="xlarge">
                        {belop + ' kroner'}
                    </Heading>
                    <BodyShort>
                        <strong>{tekst('utbetaling.person.systemtittel')}</strong>
                    </BodyShort>
                </div>
            }
        >
            <div className="arbgiver_periode">
                <BodyShort>
                    {getLedetekst(tekst('utbetaling.person.fra'), {
                        '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn)
                    })}
                </BodyShort>
                <BodyShort>
                    Periode: {periode}
                </BodyShort>
            </div>

            <PersonutbetalingInfo vedtak={vedtak} />

            <Accordion>
                <Vis hvis={vedtak.dagerPerson.length > 0}
                    render={() =>
                        <Accordion.Item ref={accordionRef} open={open} className="utbetalingsoversikt">
                            <Accordion.Header onClick={onButtonClick}>
                                Sykepenger per dag
                            </Accordion.Header>
                            <Accordion.Content>
                                <DagTabell dager={vedtak.dagerPerson} />
                                <DagBeskrivelse dager={vedtak.dagerPerson} />
                            </Accordion.Content>
                        </Accordion.Item>
                    }
                />
                <BeregningInfo vedtak={vedtak} mottaker={'person'} />
            </Accordion>

        </Ekspanderbar>
    )
}


