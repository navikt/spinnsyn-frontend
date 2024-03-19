import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../utils/tekster'

export const SykepengerTrekk = () => {
    return (
        <>
            <Heading spacing size="xsmall" level="3">
                {tekst('utbetaling.refusjon.tittel')}
            </Heading>
            <BodyShort spacing>{tekst('utbetaling.person.trekk.heading')}</BodyShort>
            <BodyShort spacing>{tekst('utbetaling.person.trekk.innhold')}</BodyShort>
        </>
    )
}
