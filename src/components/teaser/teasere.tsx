import { Element, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { Vedtak } from '../../types/vedtak'
import Vis from '../vis'
import Teaser from './teaser'
import { Select } from 'nav-frontend-skjema';
import { sorterEtterPeriodeTom } from '../../utils/sorter-vedtak';

interface SoknaderTeasereProps {
    vedtak: Vedtak[];
    className?: string;
    tittel: string;
    tomListeTekst?: string;
    kanSorteres?: boolean;
}

type Sortering = 'Dato'

const Teasere = ({ vedtak, className, tittel, tomListeTekst, kanSorteres }: SoknaderTeasereProps) => {
    const [ sortering, setSortering ] = useState<Sortering>('Dato')
    const [ sorterteVedtak, setSorterteVedtak ] = useState<Vedtak[]>([]);

    useEffect(() => {
        if (sortering === 'Dato') {
            console.log('sortering', sortering); // eslint-disable-line
            setSorterteVedtak(vedtak.sort(sorterEtterPeriodeTom))
        }
        // eslint-disable-next-line
    }, [sortering, sorterteVedtak])

    return (
        <div className={className}>
            <header className="inngangspanelerHeader">
                <Systemtittel className="inngangspanelerHeader__tittel" tag="h2">{tittel}</Systemtittel>
                <Vis hvis={kanSorteres}>
                    <Select label="Sorter etter" bredde="s"
                        className="inngangspanel__sortering"
                        onChange={(event) => {
                            setSortering(event.target.value as Sortering)
                        }}
                    >
                        <option value="Dato">Dato</option>
                    </Select>
                </Vis>
            </header>
            {sorterteVedtak.map((v, idx) => {
                return <Teaser key={idx} vedtak={v} />
            })}
            <Vis hvis={vedtak.length === 0}>
                <Element className="inngangspanel inngangspanel--tomListe">
                    {tomListeTekst}
                </Element>
            </Vis>
        </div>
    )
}

export default Teasere
