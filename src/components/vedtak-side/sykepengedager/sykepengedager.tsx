import { BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import dayjs, { Dayjs } from 'dayjs'
import React, { useState } from 'react'

import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { fallbackEstimertSluttdato } from '../../../utils/vedtak-utils'
import Ekspanderbar from '../../ekspanderbar/ekspanderbar'
import { VedtakProps } from '../vedtak'

const Sykepengedager = ({ vedtak }: VedtakProps) => {
    const [apen] = useState<boolean>(false)

    const finnSluttdato = (): Dayjs => {
        if (vedtak.vedtak.utbetaling.foreløpigBeregnetSluttPåSykepenger) {
            return dayjs(vedtak.vedtak.utbetaling.foreløpigBeregnetSluttPåSykepenger)
        }
        return fallbackEstimertSluttdato(vedtak)
    }

    const sluttdato = finnSluttdato().format('D. MMM YYYY')
    const vedtaktsdato = tilLesbarDatoMedArstall(dayjs(vedtak?.opprettetTimestamp).toDate())

    return (
        <Ekspanderbar
            type="bla"
            erUgyldig={vedtak.revurdert || vedtak.annullert}
            ikon="/syk/sykepenger/static/img/ikon-ekspander-bla.svg"
            erApen={apen}
            tittel={
                <div className="ekspanderbar__tittel">
                    <Heading size="large" level="3" className="primo">
                        {vedtak.vedtak.utbetaling.forbrukteSykedager} {tekst('sykepengedager.sykepengedager')}
                        <BodyShort as="span">
                            {getLedetekst(tekst('sykepengedager.hittil'), {
                                '%DATO%': vedtaktsdato,
                            })}
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
                        {getLedetekst(tekst('sykepengedager.gjenstar'), {
                            '%DATO%': vedtaktsdato,
                        })}
                    </BodyShort>
                </Heading>
                <BodyLong spacing className="sykepengedager-forste-avsnitt">
                    {tekst('sykepengedager.sluttdato.tekst2')}
                </BodyLong>

                <Heading spacing size="medium" level="3" className="primo">
                    {sluttdato}
                    <BodyShort as="span">
                        {getLedetekst(tekst('sykepengedager.sluttdato'), {
                            '%DATO%': vedtaktsdato,
                        })}
                    </BodyShort>
                </Heading>
                <BodyLong spacing className="sykepengedager-forste-avsnitt">
                    {tekst('sykepengedager.sluttdato.tekst3')}
                </BodyLong>
            </div>
        </Ekspanderbar>
    )
}

export default Sykepengedager
