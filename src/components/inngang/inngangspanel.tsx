import { Detail, Heading } from '@navikt/ds-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
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
    vedtak: RSVedtakWrapper;
    children: React.ReactNode;
}

export const Inngangspanel = ({ vedtak, children, }: InngangsProps) => {
    const router = useRouter()

    const query: NodeJS.Dict<string | string[]> = {}

    for (const key in router.query) {
        query[ key ] = router.query[ key ]
    }
    query[ 'id' ] = vedtak.id

    return (
        <Link href={{ query }} shallow={true}>
            <a className="inngangspanel">{children}</a>
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
            <Detail size="small" className="inngangspanel__meta">
                {meta}
            </Detail>
            <Heading size="small" level="3" className="inngangspanel__tittel">
                <span className="txtlink"> {tittel} </span>
            </Heading>
        </header>
    )
}
