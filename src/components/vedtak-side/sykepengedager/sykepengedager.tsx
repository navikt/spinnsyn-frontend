import { BodyLong, BodyShort, ExpansionCard, Heading } from '@navikt/ds-react'
import dayjs, { Dayjs } from 'dayjs'
import React, { useContext } from 'react'

import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { fallbackEstimertSluttdato } from '../../../utils/vedtak-utils'
import { VedtakProps } from '../vedtak'
import { ArkiveringContext } from '../../../context/arkivering-context'

const Sykepengedager = ({ vedtak }: VedtakProps) => {
    const arkivering = useContext(ArkiveringContext)

    const finnSluttdato = (): Dayjs => {
        if (vedtak.vedtak.utbetaling.foreløpigBeregnetSluttPåSykepenger) {
            return dayjs(vedtak.vedtak.utbetaling.foreløpigBeregnetSluttPåSykepenger)
        }
        return fallbackEstimertSluttdato(vedtak)
    }

    const sluttdato = finnSluttdato().format('D. MMM YYYY')
    const sluttPaAktuelleVedtaksPeriode = tilLesbarDatoMedArstall(vedtak.vedtak.tom)
    const ugyldig = vedtak.annullert || vedtak.revurdert

    return (
        <ExpansionCard
            aria-label="Antall sykepengedager som gjenstår"
            defaultOpen={arkivering}
            className="mt-4"
            data-cy={ugyldig ? 'sykepengedager-ec-ugyldig' : 'sykepengedager-ec'}
            style={
                {
                    '--ac-expansioncard-bg': ugyldig ? 'var(--a-gray-100)' : 'var(--a-blue-50)',
                    '--ac-expansioncard-border-color': ugyldig ? 'var(--a-gray-100)' : 'var(--a-blue-50)',
                } as React.CSSProperties
            }
        >
            <ExpansionCard.Header>
                <Heading level="2" size="large">
                    {vedtak.vedtak.utbetaling.forbrukteSykedager} {tekst('sykepengedager.sykepengedager')}
                    <BodyShort as="span" className="block">
                        {getLedetekst(tekst('sykepengedager.hittil'), {
                            '%DATO%': sluttPaAktuelleVedtaksPeriode,
                        })}
                    </BodyShort>
                </Heading>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
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
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}

export default Sykepengedager
