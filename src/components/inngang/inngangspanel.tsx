import './inngangspanel.less'

import { Undertekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'
import { Link } from 'react-router-dom'

import Vis from '../vis'

interface InngangsIkonProps {
    ikon: string;
    ikonHover?: string;
}

export const InngangsIkon = ({ ikon, ikonHover }: InngangsIkonProps) => {
    return (
        <>
            <span className="inngangspanel__ikon inngangspanel__ikon--normal">
                <img alt="" src={ikon} />
            </span>
            <Vis hvis={ikonHover !== undefined}
                render={() =>
                    <span className="inngangspanel__ikon inngangspanel__ikon--hover">
                        <img alt="" src={ikonHover || ikon} />
                    </span>
                }
            />
        </>
    )
}

interface InngangsProps {
    to: string;
    children: React.ReactNode;
}

export const Inngangspanel = ({ to, children, }: InngangsProps) => {
    return (
        <Link to={to} className="inngangspanel">
            {children}
        </Link>
    )
}

interface InngangsHeaderProps {
    meta: string;
    tittel: string;
}

export const InngangsHeader = ({ meta, tittel }: InngangsHeaderProps) => {
    return (
        <header>
            <Undertekst className="inngangspanel__meta">
                {meta}
            </Undertekst>
            <Undertittel tag="h3" className="inngangspanel__tittel">
                <span className="txtlink"> {tittel} </span>
            </Undertittel>
        </header>
    )
}
