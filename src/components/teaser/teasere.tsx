import { Select } from 'nav-frontend-skjema'
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
    kanSorteres?: boolean;
}

const Teasere = ({ vedtak, className, tittel, tomListeTekst, kanSorteres }: SoknaderTeasereProps) => {

    return (
        <div className={className}>
            <header className="inngangspanelerHeader">
                <Systemtittel className="inngangspanelerHeader__tittel" tag="h2">{tittel}</Systemtittel>
                <Vis hvis={kanSorteres}
                    render={() =>
                        <Select label="Sorter etter" bredde="s"
                            className="inngangspanel__sortering"
                            onChange={(event) => {
                                event.persist()
                            }}
                        >
                            <option value="Dato">Dato</option>
                        </Select>
                    }
                />
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
