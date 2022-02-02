import { BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import dayjs, { Dayjs } from 'dayjs'
import parser from 'html-react-parser'
import React, { useState } from 'react'

import { tekst } from '../../../utils/tekster'
import { fallbackEstimertSluttdato } from '../../../utils/vedtak-utils'
import Ekspanderbar from '../../ekspanderbar/ekspanderbar'
import EkspanderbarIntern from '../../ekspanderbar/ekspanderbar-intern'
import { VedtakProps } from '../vedtak'

const Sykepengedager = ({ vedtak }: VedtakProps) => {
    const [ apen ] = useState<boolean>(false)

    const finnSluttdato = (): Dayjs => {
        if (vedtak.vedtak.utbetaling.foreløpigBeregnetSluttPåSykepenger) {
            return dayjs(vedtak.vedtak.utbetaling.foreløpigBeregnetSluttPåSykepenger)
        }
        return fallbackEstimertSluttdato(vedtak)
    }

    const sluttdato = finnSluttdato().format('D. MMM YYYY')

    return (
        <Ekspanderbar type="bla"
            erApen={apen}
            tittel={
                <div className="ekspanderbar__tittel">
                    <Heading size="medium" level="3">
                        {vedtak.vedtak.utbetaling.forbrukteSykedager}
                        <BodyShort spacing size="small" as="span">
                            {tekst('sykepengedager.hittil')}
                        </BodyShort>
                    </Heading>
                </div>
            }
        >

            <div className="tekstinfo">
                <Heading spacing size="medium" level="3" className="primo">
                    {vedtak.vedtak.utbetaling.gjenståendeSykedager}
                    <BodyShort size="small">
                        {tekst('sykepengedager.systemtittel')}
                    </BodyShort>
                </Heading>

                <Heading spacing size="medium" level="3" className="segundo">
                    {sluttdato}
                    <BodyShort spacing size="small">
                        {tekst('sykepengedager.sluttdato')}
                    </BodyShort>
                </Heading>

                <BodyLong spacing size="small">{tekst('sykepengedager.sluttdato.tekst1')}</BodyLong>
                <BodyLong spacing size="small">{tekst('sykepengedager.sluttdato.tekst2')}</BodyLong>
                <BodyLong spacing size="small">{tekst('sykepengedager.sluttdato.tekst3')}</BodyLong>
                <BodyLong spacing size="small">{tekst('sykepengedager.sluttdato.tekst4')}</BodyLong>
            </div>

            <EkspanderbarIntern erApen={false} className="sykepenger_slutt"
                tittel={tekst('sykepengedager.ekspanderbar')}
            >
                <BodyLong spacing size="small">
                    {parser(tekst('sykepengedager.ekspanderbar.tekst'))}
                </BodyLong>
            </EkspanderbarIntern>
        </Ekspanderbar>
    )
}

export default Sykepengedager
