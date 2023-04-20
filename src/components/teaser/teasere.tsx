import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import Vis from '../vis'

import Teaser from './teaser'

interface SoknaderTeasereProps {
    vedtak: RSVedtakWrapper[]

    tittel: string
    tomListeTekst?: string
}

const Teasere = ({ vedtak, tittel, tomListeTekst }: SoknaderTeasereProps) => {
    return (
        <div className={'mb-12'}>
            <header>
                <Heading spacing size="medium" level="2">
                    {tittel}
                </Heading>
            </header>

            {vedtak.map((v, idx) => {
                return <Teaser key={idx} vedtak={v} />
            })}

            <Vis hvis={vedtak.length === 0} render={() => <BodyShort>{tomListeTekst}</BodyShort>} />
        </div>
    )
}

export default Teasere
