import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import Vis from '../vis'

import ListevisningLenkepanel from './listevisning-lenkepanel'

interface SoknaderTeasereProps {
    vedtak: RSVedtakWrapper[]

    tittel: string
    dataCy: string
    tomListeTekst?: string
}

const LenkepanelGruppering = ({ vedtak, tittel, tomListeTekst, dataCy }: SoknaderTeasereProps) => {
    return (
        <div className="mb-12" data-cy={dataCy}>
            <header>
                <Heading spacing size="medium" level="2">
                    {tittel}
                </Heading>
            </header>

            {vedtak.map((v, idx) => {
                return <ListevisningLenkepanel key={idx} vedtak={v} />
            })}

            <Vis hvis={vedtak.length === 0} render={() => <BodyShort>{tomListeTekst}</BodyShort>} />
        </div>
    )
}

export default LenkepanelGruppering
