import { Element, Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import { Soknad } from '../../types/types'
import Vis from '../vis'
import Teaser from './teaser'

interface SoknaderTeasereProps {
    soknader: Soknad[];
    className?: string;
    tittel: string;
    tomListeTekst?: string;
    id: string;
}

const Teasere = ({ soknader, className, tittel, tomListeTekst, id }: SoknaderTeasereProps) => {
    return (
        <>
            <header className='inngangspanelerHeader'>
                <Systemtittel className='inngangspanelerHeader__tittel' tag='h2'>{tittel}</Systemtittel>
            </header>
            <div id={id} className={className}>
                {soknader.map((soknad, idx) => {
                    return <Teaser key={idx} soknad={soknad} />
                })}
                <Vis hvis={soknader.length === 0}>
                    <Element className='inngangspanel inngangspanel--tomListe'>
                        {tomListeTekst}
                    </Element>
                </Vis>
            </div>
        </>
    )
}

export default Teasere
