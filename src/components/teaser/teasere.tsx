import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import Vis from '../vis'
import Teaser from './teaser'

interface SoknaderTeasereProps {
    vedtak: RSVedtakWrapper[]
    className?: string
    tittel: string
    tomListeTekst?: string
}

const Teasere = ({
    vedtak,
    className,
    tittel,
    tomListeTekst,
}: SoknaderTeasereProps) => {
    return (
        <div className={className}>
            <header className="inngangspanelerHeader">
                <Heading size="medium" level="2">
                    {tittel}
                </Heading>
            </header>

            {vedtak.map((v, idx) => {
                return <Teaser key={idx} vedtak={v} />
            })}

            <Vis
                hvis={vedtak.length === 0}
                render={() => (
                    <BodyShort className="inngangspanel inngangspanel--tomListe">
                        {tomListeTekst}
                    </BodyShort>
                )}
            />
        </div>
    )
}

export default Teasere
