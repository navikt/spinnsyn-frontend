import { BodyLong, Heading, Link } from '@navikt/ds-react'
import dayjs, { Dayjs } from 'dayjs'
import React, { useContext, useState } from 'react'

import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { fallbackEstimertSluttdato } from '../../../utils/vedtak-utils'
import { VedtakProps } from '../vedtak'
import { VedtakExpansionCard } from '../../expansioncard/vedtak-expansion-card'
import { ArkiveringContext } from '../../../context/arkivering-context'

const Sykepengedager = ({ vedtak }: VedtakProps) => {
    const arkivering = useContext(ArkiveringContext)
    const [visBeregning, setVisBeregning] = useState<boolean>(arkivering)

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
            ariaLabel="Gjenstående sykepengedager"
            tittel="Gjenstående sykepengedager"
            undertittel={`per ${sluttPaAktuelleVedtaksPeriode}`}
            vedtak={vedtak}
            apne={visBeregning}
            setApne={setVisBeregning}
        >
            <Heading spacing size="medium" level="3">
                Du har {vedtak.vedtak.utbetaling.gjenståendeSykedager} sykepengedager igjen
            </Heading>
            <BodyLong spacing>
                Du kan vanligvis få sykepenger i opptil 248 dager. Hvis du bruker opp de 248 dagene, må det gå 26 uker
                før du kan ha rett til sykepenger igjen.
            </BodyLong>

            <BodyLong spacing>
                Les mer om sykepengedager i{' '}
                <Link href="https://lovdata.no/nav/folketrygdloven/kap8/%C2%A78-12" target="_blank">
                    folketrygdloven §8-12.
                </Link>
            </BodyLong>

            <BodyLong spacing>
                Fra du er 67 år kan du kun få sykepenger i opptil 12 uker (60 dager). Etter du har fylt 70 år, får du
                ikke lenger sykepenger fra Nav.
            </BodyLong>

            <BodyLong spacing>
                Les mer om sykepengedager i{' '}
                <Link href="https://lovdata.no/nav/folketrygdloven/kap8/%C2%A78-51" target="_blank">
                    folketrygdloven §8-51
                </Link>
                .
            </BodyLong>

            <Heading spacing size="medium" level="3">
                Beregnet maksdato: {sluttdato}
            </Heading>

            <BodyLong spacing>
                Maksdatoen din er den siste dagen du har rett til sykepenger. Den gjelder kun hvis du er sykmeldt uten
                opphold og vil flytte seg hvis du for eksempel er tilbake i jobb i noen perioder.
            </BodyLong>
        </VedtakExpansionCard>
    )
}

export default Sykepengedager
