import { Accordion, BodyLong, BodyShort, Button, Heading } from '@navikt/ds-react'
import dayjs, { Dayjs } from 'dayjs'
import parser from 'html-react-parser'
import React, { useRef, useState } from 'react'

import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { fallbackEstimertSluttdato } from '../../../utils/vedtak-utils'
import { ekspanderbarKlikk } from '../../ekspanderbar/ekspander-utils'
import Ekspanderbar from '../../ekspanderbar/ekspanderbar'
import { VedtakProps } from '../vedtak'

const Sykepengedager = ({ vedtak }: VedtakProps) => {
    const [ apen ] = useState<boolean>(false)
    const [ open, setOpen ] = useState<boolean>(false)
    const accordionRef = useRef(null)

    const finnSluttdato = (): Dayjs => {
        if (vedtak.vedtak.utbetaling.foreløpigBeregnetSluttPåSykepenger) {
            return dayjs(vedtak.vedtak.utbetaling.foreløpigBeregnetSluttPåSykepenger)
        }
        return fallbackEstimertSluttdato(vedtak)
    }

    const sluttdato = finnSluttdato().format('D. MMM YYYY')
    const vedtaktsdato = tilLesbarDatoMedArstall(dayjs(vedtak?.opprettet).toDate())

    const onButtonClick = () => {
        ekspanderbarKlikk(open, accordionRef, 'Når sykepengene tar slutt')
        setOpen(!open)
    }

    return (
        <Ekspanderbar type="bla"
            ikon="/syk/sykepenger/static/img/ikon-ekspander-bla.svg"
            erApen={apen}
            tittel={
                <div className="ekspanderbar__tittel">
                    <Heading size="large" level="3" className={'primo'}>
                        {vedtak.vedtak.utbetaling.forbrukteSykedager} {tekst('sykepengedager.sykepengedager')}
                        <BodyShort as="span">
                            {getLedetekst(tekst('sykepengedager.hittil'), { '%DATO%': vedtaktsdato })}
                        </BodyShort>
                    </Heading>
                </div>
            }
        >

            <div className="tekstinfo">
                <BodyLong spacing>{tekst('sykepengedager.sluttdato.tekst1')}</BodyLong>
                <Heading spacing size="medium" level="3" className="primo">
                    {vedtak.vedtak.utbetaling.gjenståendeSykedager} {tekst('sykepengedager.sykepengedager')}
                    <BodyShort as="span">
                        {getLedetekst(tekst('sykepengedager.gjenstar'), { '%DATO%': vedtaktsdato })}
                    </BodyShort>
                </Heading>
                <BodyLong spacing className="sykepengedager-forste-avsnitt">{tekst('sykepengedager.sluttdato.tekst2')}</BodyLong>

                <Heading spacing size="medium" level="3" className="primo">
                    {sluttdato}
                    <BodyShort as="span">
                        {getLedetekst(tekst('sykepengedager.sluttdato'), { '%DATO%': vedtaktsdato })}
                    </BodyShort>
                </Heading>
                <BodyLong spacing className="sykepengedager-forste-avsnitt">{tekst('sykepengedager.sluttdato.tekst3')}</BodyLong>
                <BodyLong spacing>{tekst('sykepengedager.sluttdato.tekst4')}</BodyLong>
            </div>

            <Accordion ref={accordionRef} className="sykepenger_slutt">
                <Accordion.Item open={open}>
                    <Accordion.Header onClick={onButtonClick}>
                        {tekst('sykepengedager.ekspanderbar')}
                    </Accordion.Header>
                    <Accordion.Content>
                        <BodyLong spacing>
                            {parser(tekst('sykepengedager.ekspanderbar.tekst'))}
                        </BodyLong>
                        <div className="knapperad">
                            <Button variant="tertiary" size="small" onClick={onButtonClick}>
                                Skjul
                            </Button>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </Ekspanderbar>
    )
}

export default Sykepengedager
