import { Accordion, BodyLong, BodyShort, Heading, Link } from '@navikt/ds-react'
import React, { useContext, useState } from 'react'

import DagTabell from '../../../dager/dag-tabell'
import DagBeskrivelse from '../../../dager/dag-beskrivelse'
import { ArkiveringContext } from '../../../../context/arkivering-context'
import { RSUtbetalingdag, RSVedtakWrapperUtvidet } from '../../../../types/rs-types/rs-vedtak-felles'
import { dagErAvvist } from '../../vedtak'
import { logEvent } from '../../../umami/umami'
import { useScrollTilElement } from '../../../../hooks/useScrollTilElement'
import { rsDagerTilRSUtbetalingdagerMapper } from '../../../../utils/vedtak-utils'
import { validerNyUtbetalingsdagListe } from '../../../../daglogikk/hentDagerPaaVedtak'

type AlleSykepengerPerDagProps = {
    vedtak: RSVedtakWrapperUtvidet
    setParentApne?: (apne: boolean) => void
}

export const AlleSykepengerPerDag = ({ vedtak, setParentApne }: AlleSykepengerPerDagProps) => {
    const erDirekteutbetaling = vedtak.sykepengebelopPerson > 0
    const erRefusjon = vedtak.sykepengebelopArbeidsgiver > 0
    const ingenNyArbeidsgiverperiode = vedtak.vedtak.tags?.includes('IngenNyArbeidsgiverperiode') || false

    const dager = vedtak.vedtak.utbetaling.utbetalingsdager
    const dagerArbeidsgiver: RSUtbetalingdag[] = []
    const dagerPerson: RSUtbetalingdag[] = []
    const dagerNav: RSUtbetalingdag[] = []

    dager?.forEach((dag) => {
        if (dag.beløpTilArbeidsgiver && dag.beløpTilArbeidsgiver > 0) {
            dagerArbeidsgiver.push(dag)
        } else if (dag.beløpTilSykmeldt && dag.beløpTilSykmeldt > 0) {
            dagerPerson.push(dag)
        } else {
            dagerNav.push(dag)
        }
    })

    const sorterDagerEtterDato = (a: RSUtbetalingdag, b: RSUtbetalingdag) => a.dato.localeCompare(b.dato)
    const dagerArbeidsgiverSortert = [...dagerNav, ...dagerArbeidsgiver].sort(sorterDagerEtterDato)
    const dagerPersonSortert = [...dagerNav, ...dagerPerson].sort(sorterDagerEtterDato)

    const hentDagerArbeidsgiver = () => {
        if (!dager) return rsDagerTilRSUtbetalingdagerMapper(vedtak.dagerArbeidsgiver, true)

        const erGyldig = validerNyUtbetalingsdagListe(dagerArbeidsgiverSortert, vedtak.dagerArbeidsgiver)
        return erGyldig ? dagerArbeidsgiverSortert : rsDagerTilRSUtbetalingdagerMapper(vedtak.dagerArbeidsgiver, true)
    }

    const hentDagerPerson = () => {
        if (!dager) return rsDagerTilRSUtbetalingdagerMapper(vedtak.dagerPerson, false)

        const erGyldig = validerNyUtbetalingsdagListe(dagerPersonSortert, vedtak.dagerPerson)
        return erGyldig ? dagerPersonSortert : rsDagerTilRSUtbetalingdagerMapper(vedtak.dagerPerson, false)
    }

    return (
        <>
            {erRefusjon && erDirekteutbetaling ? (
                <>
                    <SykepengerPerDag
                        tittel="Sykepenger per dag til arbeidsgiver"
                        dager={hentDagerArbeidsgiver()}
                        ingenNyArbeidsgiverperiode={ingenNyArbeidsgiverperiode}
                        scrollElementId="sykepenger-per-dag-arbeidsgiver"
                        setForelderElementApen={setParentApne}
                        refusjon={true}
                    />
                    <SykepengerPerDag
                        tittel="Sykepenger per dag til deg"
                        dager={hentDagerPerson()}
                        ingenNyArbeidsgiverperiode={ingenNyArbeidsgiverperiode}
                        scrollElementId="sykepenger-per-dag"
                        setForelderElementApen={setParentApne}
                    />
                </>
            ) : erRefusjon ? (
                <SykepengerPerDag
                    tittel="Dine sykepenger per dag"
                    dager={hentDagerArbeidsgiver()}
                    ingenNyArbeidsgiverperiode={ingenNyArbeidsgiverperiode}
                    scrollElementId="sykepenger-per-dag-arbeidsgiver"
                    setForelderElementApen={setParentApne}
                    refusjon={true}
                />
            ) : (
                <SykepengerPerDag
                    tittel="Dine sykepenger per dag"
                    dager={hentDagerPerson()}
                    ingenNyArbeidsgiverperiode={ingenNyArbeidsgiverperiode}
                    scrollElementId="sykepenger-per-dag"
                    setForelderElementApen={setParentApne}
                />
            )}
        </>
    )
}

type SykepengerPerDagProps = {
    dager: RSUtbetalingdag[]
    tittel: string
    ingenNyArbeidsgiverperiode: boolean
    scrollElementId: string
    setForelderElementApen?: (apne: boolean) => void
    refusjon?: boolean
}

export const SykepengerPerDag = ({
    tittel,
    dager,
    ingenNyArbeidsgiverperiode,
    scrollElementId,
    setForelderElementApen,
    refusjon,
}: SykepengerPerDagProps) => {
    const arkivering = useContext(ArkiveringContext)
    const [visDagTabell, setVisDagTabell] = useState<boolean>(arkivering)
    useScrollTilElement(scrollElementId, visDagTabell, setVisDagTabell, setForelderElementApen)

    if (dager.length == 0) return null
    const harAvvisteDager = dager.some((dag) => dagErAvvist.includes(dag.type))

    return (
        <Accordion.Item
            id={scrollElementId}
            defaultOpen={arkivering}
            open={visDagTabell}
            onOpenChange={(open) => {
                logEvent(open ? 'accordion åpnet' : 'accordion lukket', {
                    tittel: tittel,
                    component: 'SykepengerPerDag',
                })
                setVisDagTabell(open)
            }}
        >
            <Accordion.Header>
                <Heading size="small" level="3" tabIndex={-1}>
                    {tittel}
                </Heading>
            </Accordion.Header>
            <Accordion.Content className="bg-white px-0">
                {harAvvisteDager && (
                    <BodyShort>
                        Vi ser at du ikke har rett til sykepenger for én eller flere av dagene i denne
                        sykmeldingsperioden. Nedenfor ser du dagene du ikke får utbetaling for, og hvorfor.
                    </BodyShort>
                )}
                {ingenNyArbeidsgiverperiode && (
                    <BodyLong spacing>
                        {
                            'Det er tidligere utbetalt en hel arbeidsgiverperiode. Etter dette har vi vurdert at du ikke har gjenopptatt arbeidet og deretter vært friskmeldt i mer enn 16 dager. Nav har derfor utbetalt sykepenger fra første dag du ble sykmeldt. Se '
                        }
                        <Link target="_blank" href="https://lovdata.no/nav/folketrygdloven/kap8/%C2%A78-19">
                            folketrygdloven § 8-19, fjerde ledd
                        </Link>
                        .
                    </BodyLong>
                )}
                <DagTabell dager={dager} refusjon={refusjon} />
                <DagBeskrivelse dager={dager} />
            </Accordion.Content>
        </Accordion.Item>
    )
}
