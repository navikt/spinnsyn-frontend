import { Accordion, BodyLong, Heading, Link } from '@navikt/ds-react'
import React, { useContext } from 'react'

import DagTabell from '../../../dager/dag-tabell'
import DagBeskrivelse from '../../../dager/dag-beskrivelse'
import { ArkiveringContext } from '../../../../context/arkivering-context'
import { RSDag } from '../../../../types/rs-types/rs-vedtak-felles'
import { VedtakProps } from '../../vedtak'
import { logEvent } from '../../../amplitude/amplitude'

interface SykepengerPerDagProps {
    dager: RSDag[]
    tittel: string
    ingenNyArbeidsgiverperiode: boolean
}

export const AlleSykepengerPerDag = ({ vedtak }: VedtakProps) => {
    const erDirekteutbetaling = vedtak.sykepengebelopPerson > 0
    const erRefusjon = vedtak.sykepengebelopArbeidsgiver > 0
    const ingenNyArbeidsgiverperiode = vedtak.vedtak.tags?.includes('IngenNyArbeidsgiverperiode') || false
    const tittel = !(erDirekteutbetaling && erRefusjon) ? 'Dine sykepenger per dag' : undefined
    return (
        <>
            {erRefusjon && erDirekteutbetaling ? (
                <>
                    <SykepengerPerDag
                        tittel={tittel ?? 'Sykepenger per dag til arbeidsgiver'}
                        dager={vedtak.dagerArbeidsgiver}
                        ingenNyArbeidsgiverperiode={ingenNyArbeidsgiverperiode}
                    />
                    <SykepengerPerDag
                        tittel={tittel ?? 'Sykepenger per dag til deg'}
                        dager={vedtak.dagerPerson}
                        ingenNyArbeidsgiverperiode={ingenNyArbeidsgiverperiode}
                    />
                </>
            ) : (
                <SykepengerPerDag
                    tittel="Dine sykepenger per dag"
                    dager={erRefusjon ? vedtak.dagerArbeidsgiver : vedtak.dagerPerson}
                    ingenNyArbeidsgiverperiode={ingenNyArbeidsgiverperiode}
                />
            )}
        </>
    )
}

export const SykepengerPerDag = ({ tittel, dager, ingenNyArbeidsgiverperiode }: SykepengerPerDagProps) => {
    const isServer = useContext(ArkiveringContext)
    if (dager.length == 0) return null

    return (
        <Accordion.Item
            defaultOpen={isServer}
            onOpenChange={(open) =>
                logEvent(open ? 'accordion åpnet' : 'accordion lukket', {
                    tittel: tittel,
                    component: 'SykepengerPerDag',
                })
            }
        >
            <Accordion.Header>
                <Heading size="small" level="3">
                    {tittel}
                </Heading>
            </Accordion.Header>
            <Accordion.Content className="bg-white px-0">
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
