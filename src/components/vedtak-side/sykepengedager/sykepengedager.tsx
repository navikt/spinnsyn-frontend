import { BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import dayjs, { Dayjs } from 'dayjs'
import React from 'react'

import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { fallbackEstimertSluttdato } from '../../../utils/vedtak-utils'
import { VedtakProps } from '../vedtak'
import { VedtakExpansionCard } from '../../expansioncard/vedtak-expansion-card'

const Sykepengedager = ({ vedtak }: VedtakProps) => {
    const finnSluttdato = (): Dayjs => {
        if (vedtak.vedtak.utbetaling.foreløpigBeregnetSluttPåSykepenger) {
            return dayjs(vedtak.vedtak.utbetaling.foreløpigBeregnetSluttPåSykepenger)
        }
        return fallbackEstimertSluttdato(vedtak)
    }

    const sluttdato = finnSluttdato().format('D. MMM YYYY')
    const sluttPaAktuelleVedtaksPeriode = tilLesbarDatoMedArstall(vedtak.vedtak.tom)

    return (
        <VedtakExpansionCard
            ariaLabel="Antall sykepengedager som gjenstår"
            tittel={vedtak.vedtak.utbetaling.forbrukteSykedager + ' ' + tekst('sykepengedager.sykepengedager')}
            undertittel={getLedetekst(tekst('sykepengedager.hittil'), {
                '%DATO%': sluttPaAktuelleVedtaksPeriode,
            })}
            vedtak={vedtak}
        >
            <BodyLong spacing>{tekst('sykepengedager.sluttdato.tekst1')}</BodyLong>
            <Heading spacing size="medium" level="3">
                {vedtak.vedtak.utbetaling.gjenståendeSykedager} {tekst('sykepengedager.sykepengedager')}
                <BodyShort as="span" className="block">
                    {getLedetekst(tekst('sykepengedager.gjenstar'), {
                        '%DATO%': sluttPaAktuelleVedtaksPeriode,
                    })}
                </BodyShort>
            </Heading>
            <BodyLong spacing className="sykepengedager-forste-avsnitt">
                {tekst('sykepengedager.sluttdato.tekst2')}
            </BodyLong>

            <Heading spacing size="medium" level="3" className="primo">
                {sluttdato}
                <BodyShort as="span" className="block">
                    {getLedetekst(tekst('sykepengedager.sluttdato'), {
                        '%DATO%': sluttPaAktuelleVedtaksPeriode,
                    })}
                </BodyShort>
            </Heading>
            <BodyLong spacing className="sykepengedager-forste-avsnitt">
                {tekst('sykepengedager.sluttdato.tekst3')}
            </BodyLong>
        </VedtakExpansionCard>
    )
}

export default Sykepengedager
