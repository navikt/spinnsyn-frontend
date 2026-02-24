import { Accordion, BodyLong, BodyShort, Heading, Link } from '@navikt/ds-react'
import React, { useContext, useState } from 'react'

import DagTabell from '../../../dager/dag-tabell'
import DagBeskrivelse from '../../../dager/dag-beskrivelse'
import { ArkiveringContext } from '../../../../context/arkivering-context'
import { RSDag, RSVedtakWrapperUtvidet } from '../../../../types/rs-types/rs-vedtak-felles'
import { dagErAvvist } from '../../vedtak'
import { logEvent } from '../../../umami/umami'
import { useScrollTilElement } from '../../../../hooks/useScrollTilElement'

type AlleSykepengerPerDagProps = {
    vedtak: RSVedtakWrapperUtvidet
    setParentApne?: (apne: boolean) => void
}

export const AlleSykepengerPerDag = ({ vedtak, setParentApne }: AlleSykepengerPerDagProps) => {
    const erDirekteutbetaling = vedtak.sykepengebelopPerson > 0
    const erRefusjon = vedtak.sykepengebelopArbeidsgiver > 0
    const ingenNyArbeidsgiverperiode = vedtak.vedtak.tags?.includes('IngenNyArbeidsgiverperiode') || false

    return (
        <>
            {erRefusjon && erDirekteutbetaling ? (
                <>
                    <SykepengerPerDag
                        tittel="Sykepenger per dag til arbeidsgiver"
                        dager={vedtak.dagerArbeidsgiver}
                        ingenNyArbeidsgiverperiode={ingenNyArbeidsgiverperiode}
                        scrollElementId="sykepenger-per-dag-arbeidsgiver"
                        setForelderElementApen={setParentApne}
                    />
                    <SykepengerPerDag
                        tittel="Sykepenger per dag til deg"
                        dager={vedtak.dagerPerson}
                        ingenNyArbeidsgiverperiode={ingenNyArbeidsgiverperiode}
                        scrollElementId="sykepenger-per-dag"
                        setForelderElementApen={setParentApne}
                    />
                </>
            ) : erRefusjon ? (
                <SykepengerPerDag
                    tittel="Sykepenger per dag til arbeidsgiver"
                    dager={vedtak.dagerArbeidsgiver}
                    ingenNyArbeidsgiverperiode={ingenNyArbeidsgiverperiode}
                    scrollElementId="sykepenger-per-dag-arbeidsgiver"
                    setForelderElementApen={setParentApne}
                />
            ) : (
                <SykepengerPerDag
                    tittel="Dine sykepenger per dag"
                    dager={vedtak.dagerPerson}
                    ingenNyArbeidsgiverperiode={ingenNyArbeidsgiverperiode}
                    scrollElementId="sykepenger-per-dag"
                    setForelderElementApen={setParentApne}
                />
            )}
        </>
    )
}

type SykepengerPerDagProps = {
    dager: RSDag[]
    tittel: string
    ingenNyArbeidsgiverperiode: boolean
    scrollElementId: string
    setForelderElementApen?: (apne: boolean) => void
}

export const SykepengerPerDag = ({
    tittel,
    dager,
    ingenNyArbeidsgiverperiode,
    scrollElementId,
    setForelderElementApen,
}: SykepengerPerDagProps) => {
    const arkivering = useContext(ArkiveringContext)
    const [visDagTabell, setVisDagTabell] = useState<boolean>(arkivering)
    useScrollTilElement(scrollElementId, visDagTabell, setVisDagTabell, setForelderElementApen)

    if (dager.length == 0) return null
    const harAvvisteDager = dager.some((dag) => dagErAvvist.includes(dag.dagtype))

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
                <DagTabell dager={dager} />
                <DagBeskrivelse dager={dager} />
            </Accordion.Content>
        </Accordion.Item>
    )
}
