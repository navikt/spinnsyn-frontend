import { Element, Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import Vis from '../vis'
import Teaser from './teaser'

interface SoknaderTeasereProps {
    vedtak: RSVedtakWrapper[];
    className?: string;
    tittel: string;
    tomListeTekst?: string;
}

const Teasere = ({ vedtak, className, tittel, tomListeTekst }: SoknaderTeasereProps) => {

    return (
        <div className={className}>
            <header className="inngangspanelerHeader">
                <Systemtittel className="inngangspanelerHeader__tittel" tag="h2">{tittel}</Systemtittel>
            </header>

            {vedtak.map((v, idx) => {
                return <Teaser key={idx} vedtak={v} />
            })}

            <Vis hvis={vedtak.length === 0}
                render={() =>
                    <Element className="inngangspanel inngangspanel--tomListe">
                        {tomListeTekst}
                    </Element>
                }
            />
        </div>
    )
}

export default Teasere
