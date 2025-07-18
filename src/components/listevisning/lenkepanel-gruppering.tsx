import { BodyShort, Heading, Skeleton } from '@navikt/ds-react'
import React from 'react'

import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak-felles'

import ListevisningLenkepanel from './listevisning-lenkepanel'

interface SoknaderTeasereProps {
    vedtak?: RSVedtakWrapper[]

    tittel: string
    dataCy: string
    tomListeTekst?: string
}

const LenkepanelGruppering = ({ vedtak, tittel, tomListeTekst, dataCy }: SoknaderTeasereProps) => {
    return (
        <div className="mb-12" data-testid={dataCy}>
            <Heading spacing size="medium" as={vedtak ? 'h2' : Skeleton}>
                {tittel}
            </Heading>

            {vedtak?.map((v, idx) => {
                return <ListevisningLenkepanel key={idx} vedtak={v} />
            })}
            {!vedtak && <Skeleton variant="rectangle" className="h-[138px] max-[560px]:h-[150px]" />}

            {vedtak?.length === 0 && <BodyShort>{tomListeTekst}</BodyShort>}
        </div>
    )
}

export default LenkepanelGruppering
