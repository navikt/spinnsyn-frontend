import { Accordion, Heading } from '@navikt/ds-react'
import React, { useContext } from 'react'

import DagTabell from '../../../dager/dag-tabell'
import DagBeskrivelse from '../../../dager/dag-beskrivelse'
import { ArkiveringContext } from '../../../../context/arkivering-context'
import { RSDag } from '../../../../types/rs-types/rs-vedtak'
import { VedtakProps } from '../../vedtak'

interface SykepengerPerDagProps {
    dager: RSDag[]
    tittel?: string
}

export const AlleSykepengerPerDag = ({ vedtak }: VedtakProps) => {
    const erDirekteutbetaling = vedtak.sykepengebelopPerson > 0
    const erRefusjon = vedtak.sykepengebelopArbeidsgiver > 0
    const erBegge = erDirekteutbetaling && erRefusjon
    if (erBegge) {
        return (
            <>
                <SykepengerPerDag tittel="Sykepenger per dag til deg" dager={vedtak.dagerPerson} />
                <SykepengerPerDag tittel="Sykepenger per dag til arbeidsgiver" dager={vedtak.dagerArbeidsgiver} />
            </>
        )
    }
    if (erDirekteutbetaling) {
        return <SykepengerPerDag dager={vedtak.dagerPerson} />
    }
    if (erRefusjon) {
        return <SykepengerPerDag dager={vedtak.dagerArbeidsgiver} />
    }
    return null
}

export const SykepengerPerDag = ({ tittel, dager }: SykepengerPerDagProps) => {
    const isServer = useContext(ArkiveringContext)

    if (dager.length == 0) return null

    return (
        <Accordion.Item defaultOpen={isServer}>
            <Accordion.Header>
                <Heading size="small" level="3">
                    {tittel || 'Sykepenger per dag'}
                </Heading>
            </Accordion.Header>
            <Accordion.Content className="bg-white">
                <DagTabell dager={dager} />

                <DagBeskrivelse dager={dager} />
            </Accordion.Content>
        </Accordion.Item>
    )
}
