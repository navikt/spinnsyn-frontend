import { Accordion, BodyShort, Heading } from '@navikt/ds-react'
import React, { useState } from 'react'

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

export const PersonutbetalingMedInntekt = ({ vedtak }: VedtakProps) => {
    const [ apen ] = useState<boolean>(true)
    const [ open, setOpen ] = useState<boolean>(true)
    const belop = ValutaFormat.format(vedtak.sykepengebelopPerson)
    const periode = tilLesbarPeriodeMedArstall(vedtak?.vedtak.fom, vedtak?.vedtak.tom)

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

            <Vis hvis={vedtak.dagerPerson.length > 0}
                render={() =>
                    <Accordion>
                        <Accordion.Item open={open} className="utbetalingsoversikt">
                            <Accordion.Header onClick={() => setOpen(!open)}>
                                Sykepenger per dag
                            </Accordion.Header>
                            <Accordion.Content>
                                <DagTabell dager={vedtak.dagerPerson} />
                                <DagBeskrivelse dager={vedtak.dagerPerson} />
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                }
            />
            <BeregningInfo vedtak={vedtak} mottaker={'person'} />

        </Ekspanderbar>
    )
}


