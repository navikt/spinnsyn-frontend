import { BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import dayjs, { Dayjs } from 'dayjs'
import parser from 'html-react-parser'
import React, { useState } from 'react'

import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { fallbackEstimertSluttdato, klagefrist } from '../../../utils/vedtak-utils'
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

    const vedtaktsdato = tilLesbarDatoMedArstall(dayjs(vedtak?.opprettet).toDate())

    return (
        <Ekspanderbar type="bla"
            erApen={apen}
            tittel={
                <div className="ekspanderbar__tittel">
                    <Heading size="medium" level="3" className={'primo'}>
                        {vedtak.vedtak.utbetaling.forbrukteSykedager} {tekst('sykepengedager.sykepengedager')}
                        <BodyShort size="small" as="span">
                            {getLedetekst(tekst('sykepengedager.hittil'), { '%DATO%': vedtaktsdato })}
                        </BodyShort>
                    </Heading>
                </div>
            }
        >

            <div className="tekstinfo">
                <BodyLong spacing size="small">{tekst('sykepengedager.sluttdato.tekst1')}</BodyLong>
                <Heading spacing size="medium" level="3" className="primo">
                    {vedtak.vedtak.utbetaling.gjenståendeSykedager} {tekst('sykepengedager.sykepengedager')}
                    <BodyShort size="small" as="span">
                        {getLedetekst(tekst('sykepengedager.gjenstar'), { '%DATO%': vedtaktsdato })}
                    </BodyShort>
                </Heading>
                <BodyLong spacing className="sykepengedager-forste-avsnitt" size="small">{tekst('sykepengedager.sluttdato.tekst2')}</BodyLong>

                <Heading spacing size="medium" level="3" className="primo">
                    {sluttdato}
                    <BodyShort size="small" as="span">
                        {getLedetekst(tekst('sykepengedager.sluttdato'), { '%DATO%': vedtaktsdato })}

                    </BodyShort>
                </Heading>
                <BodyLong spacing className="sykepengedager-forste-avsnitt" size="small">{tekst('sykepengedager.sluttdato.tekst3')}</BodyLong>
                <BodyLong spacing size="small">{tekst('sykepengedager.sluttdato.tekst4')}</BodyLong>
            </div>

        </Ekspanderbar>
    )
}

export default Sykepengedager
