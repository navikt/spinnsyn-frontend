import { Accordion, BodyLong, Heading, Link } from '@navikt/ds-react'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ArkiveringContext } from '../../../../context/arkivering-context'
import { useScroll } from '../../../../context/scroll-context'
import { logEvent } from '../../../amplitude/amplitude'

export const MerOmBergningenNargingsdrivende = () => {
    const arkivering = useContext(ArkiveringContext)
    const { apneElementMedId, registrerElement } = useScroll()
    const [visBeregning, setVisBeregning] = useState<boolean>(arkivering)
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (apneElementMedId === 'mer_om_beregningen') {
            setVisBeregning(true)
        }
    }, [apneElementMedId])

    useEffect(() => {
        if (elementRef.current !== null) {
            registrerElement('mer_om_beregningen', elementRef)
        }
    }, [elementRef?.current?.id, registrerElement])

    return (
        <Accordion.Item
            data-testid="mer-om-beregningen"
            defaultOpen={arkivering}
            open={visBeregning}
            onOpenChange={(isOpen) => {
                logEvent(isOpen ? 'accordion åpnet' : 'accordion lukket', {
                    tittel: 'Mer om beregningen (næringsdrivende)',
                    component: 'InntekterLagtTilGrunnNaringsdrivende',
                })
                setVisBeregning(isOpen)
            }}
        >
            <Accordion.Header>Mer om beregningen</Accordion.Header>
            <Accordion.Content className="mt-4">
                <Heading spacing size="xsmall" level="3">
                    Sykepengegrunnlaget ditt
                </Heading>
                <BodyLong spacing>
                    Sykepengegrunnlaget er inntekten Nav legger til grunn når vi beregner sykepengene dine.{' '}
                </BodyLong>
                <BodyLong spacing>
                    Vi bruker vanligvis gjennomsnittet av den pensjonsgivende inntekten din for de siste tre årene før
                    du ble syk for å beregne sykepengegrunnlaget. Inntekten blir justert etter årlige endringer i
                    grunnbeløpet i folketrygden.
                </BodyLong>
                <BodyLong spacing>
                    Sykepengegrunnlaget er begrenset til seks ganger{' '}
                    <Link href="https://www.nav.no/grunnbelopet">grunnbeløpet i folketrygden</Link> (6G). Tjener du mer
                    enn 6G i et enkelt år i perioden vi bruker i beregningen, regner Nav med 1/3 av inntekten din mellom
                    6G og 12G. Inntekt over 12G tas ikke med.
                </BodyLong>
                <BodyLong spacing>
                    Er sykepengegrunnlaget ditt lavere enn 1/2 G, vil du ikke ha rett til sykepenger.{' '}
                </BodyLong>
                <BodyLong spacing>
                    Du kan lese mer om hvordan sykepengegrunnlaget beregnes i
                    <Link href="https://lovdata.no/nav/folketrygdloven/kap8/%C2%A78-10">folketrygdloven §§ 8-10</Link>{' '}
                    og <Link href="https://lovdata.no/nav/folketrygdloven/kap8/%C2%A78-35">8-35.</Link>
                </BodyLong>

                <Heading size="xsmall" level="3">
                    Rett til sykepenger
                </Heading>
                <BodyLong spacing>
                    Du har rett til sykepenger tilsvarende 80 % av sykepengegrunnlaget fra 17. dag i sykefraværet ditt,
                    med mindre du har forsikring fra Nav.{' '}
                </BodyLong>
                <BodyLong spacing>
                    De første 16 dagene telles fra du oppsøker lege og får en sykmelding, eller du gir beskjed til Nav
                    om at du er syk og ikke kan jobbe.{' '}
                </BodyLong>
                <BodyLong spacing>
                    Hvor mye sykepenger du kan få beregnes utifra arbeidstiden og/eller inntekten du har tapt i
                    perioden. Er du sykmeldt mindre enn 100 % av arbeidstiden din, får du sykepenger for den delen du er
                    sykmeldt. Er du sykmeldt mindre enn 20 %, har du ikke rett til sykepenger.{' '}
                </BodyLong>
                <BodyLong spacing>
                    Les mer om sykepengedekningen i{' '}
                    <Link href="https://lovdata.no/nav/folketrygdloven/kap8/%C2%A78-34">folketrygdloven § 8-34.</Link>
                </BodyLong>
                <BodyLong spacing>
                    Les mer om <Link href="https://www.nav.no/forsikring-sykepenger"> forsikring fra Nav.</Link>
                </BodyLong>
                <BodyLong spacing>
                    Les mer om minste sykmeldingsgrad i{' '}
                    <Link href="https://lovdata.no/nav/folketrygdloven/kap8/%C2%A78-13">folketrygdloven § 8-13.</Link>
                </BodyLong>

                <Heading size="xsmall" level="3">
                    Dine sykepenger per dag
                </Heading>
                <BodyLong spacing>
                    For å beregne hvor mye sykepenger du skal ha per dag, deler vi sykepengegrunnlaget ditt på 260, som
                    er alle dager i året minus lørdager og søndager. Dette kaller vi ‘dagsatsen’.
                </BodyLong>
                <BodyLong spacing>
                    Er du sykmeldt mindre enn 100 %, blir dagsatsen ganget med prosenten du er sykmeldt den dagen.
                </BodyLong>
                <BodyLong spacing>
                    Sykepenger utbetales bare for dagene mandag til fredag. Hvis du kun har vært sykmeldt en lørdag
                    og/eller søndag, får du ikke sykepenger for disse dagene. Er du sykmeldt lenger enn dette, blir
                    lørdag og søndag likevel regnet med i sykepengene du får, men inntekten blir fordelt på ukedagene.
                </BodyLong>
                <BodyLong spacing>
                    Les mer om sykepengedager i{' '}
                    <Link href="https://lovdata.no/nav/folketrygdloven/kap8/%C2%A78-12">folketrygdloven § 8-12.</Link>
                </BodyLong>

                <Heading size="xsmall" level="3">
                    Totalbeløpet
                </Heading>
                <BodyLong spacing>
                    Totalbeløpet er summen av alle dagene i perioden, og det du får utbetalt. Totalbeløpet er før skatt
                    og eventuelle andre pålagte trekk.
                </BodyLong>

                <Heading size="xsmall" level="3">
                    Utbetaling
                </Heading>
                <BodyLong spacing>
                    Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden, eller innen fem dager etter at
                    vi har sendt deg svar på søknaden din. Da kan du se beløpet i{' '}
                    <Link href="https://tjenester.nav.no/utbetalingsoversikt">Din utbetalingsoversikt</Link> med
                    skattetrekk og eventuelle andre trekk.
                </BodyLong>
            </Accordion.Content>
        </Accordion.Item>
    )
}
