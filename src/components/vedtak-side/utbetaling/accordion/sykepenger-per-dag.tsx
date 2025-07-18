import { Accordion, BodyLong, Heading, Link } from '@navikt/ds-react'
import React, { useContext } from 'react'

import DagTabell from '../../../dager/dag-tabell'
import DagBeskrivelse from '../../../dager/dag-beskrivelse'
import { ArkiveringContext } from '../../../../context/arkivering-context'
import { RSDag } from '../../../../types/rs-types/rs-vedtak-felles'
import { VedtakProps } from '../../vedtak'
import { erWeekendPeriode } from '../../../../utils/dato-utils'

interface SykepengerPerDagProps {
    dager: RSDag[]
    tittel?: string
    ingenNyArbeidsgiverperiode: boolean
}

export const AlleSykepengerPerDag = ({ vedtak }: VedtakProps) => {
    const erDirekteutbetaling = vedtak.sykepengebelopPerson > 0
    const erRefusjon = vedtak.sykepengebelopArbeidsgiver > 0
    const erBegge = erDirekteutbetaling && erRefusjon
    const ingenNyArbeidsgiverperiode = vedtak.vedtak.tags?.includes('IngenNyArbeidsgiverperiode') || false
    if (erBegge) {
        return (
            <>
                <SykepengerPerDag
                    tittel="Sykepenger per dag til arbeidsgiver"
                    dager={vedtak.dagerArbeidsgiver}
                    ingenNyArbeidsgiverperiode={ingenNyArbeidsgiverperiode}
                />
                <SykepengerPerDag
                    tittel="Sykepenger per dag til deg"
                    dager={vedtak.dagerPerson}
                    ingenNyArbeidsgiverperiode={ingenNyArbeidsgiverperiode}
                />
            </>
        )
    }
    if (erDirekteutbetaling) {
        return <SykepengerPerDag dager={vedtak.dagerPerson} ingenNyArbeidsgiverperiode={ingenNyArbeidsgiverperiode} />
    }
    if (erRefusjon || erWeekendPeriode(vedtak.vedtak.fom, vedtak.vedtak.tom)) {
        return (
            <SykepengerPerDag
                dager={vedtak.dagerArbeidsgiver}
                ingenNyArbeidsgiverperiode={ingenNyArbeidsgiverperiode}
            />
        )
    }
    return null
}

export const SykepengerPerDag = ({ tittel, dager, ingenNyArbeidsgiverperiode }: SykepengerPerDagProps) => {
    const isServer = useContext(ArkiveringContext)

    if (dager.length == 0) return null

    return (
        <Accordion.Item defaultOpen={isServer}>
            <Accordion.Header>
                <Heading size="small" level="3">
                    {tittel || 'Dine sykepenger per dag'}
                </Heading>
            </Accordion.Header>
            <Accordion.Content className="bg-white px-0">
                {ingenNyArbeidsgiverperiode && (
                    <BodyLong spacing>
                        {
                            'Det er tidligere utbetalt en hel arbeidsgiverperiode. Etter dette har vi vurdert at du ikke har gjenopptatt arbeidet og deretter vært friskmeldt i mer enn 16 dager. Nav har derfor utbetalt sykepenger fra første dag du ble sykmeldt. Se '
                        }
                        <Link target="_blank" href="https://lovdata.no/nav/folketrygdloven/kap8/%C2%A78-19">
                            folketrygdloven §8-19, fjerde ledd
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
