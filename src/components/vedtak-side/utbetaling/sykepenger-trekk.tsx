import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../utils/tekster'

export const SykepengerTrekk = () => {
    return (
        <>
            <BodyShort spacing>{tekst('utbetaling.person.trekk.heading')}</BodyShort>
            <BodyShort spacing style={{ fontStyle: 'italic' }}>
                {tekst('utbetaling.person.trekk.innhold')}
            </BodyShort>
        </>
    )
}
