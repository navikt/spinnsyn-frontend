import { Collapse } from '@navikt/ds-icons'
import { BodyLong } from '@navikt/ds-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { UrlObject } from 'url'

import { dittNavUrl, spinnsynFrontendInterne, sykefravaerUrl } from '../../utils/environment'
import Vis from '../vis'
import Person from './Person'

const LITEN = 768

const faste: Brodsmule[] = [
    { tittel: 'Ditt NAV', sti: dittNavUrl() },
    { tittel: 'Ditt sykefravær', sti: sykefravaerUrl() }
]

const BrodsmuleBit = ({ sti, tittel }: Brodsmule) => {
    const erKlikkbar = sti !== undefined
    const erEkstern = typeof sti === 'string'

    const eksternLenke = () => {
        if (spinnsynFrontendInterne()) {
            return (
                <span>{tittel}</span>
            )
        }
        return <a className="navds-link" href={sti as string}>{tittel}</a>
    }

    const link = erEkstern
        ? eksternLenke()
        : sti
            ? <Link href={sti} shallow={true}>
                <a className="navds-link">{tittel}</a>
            </Link>
            : <span>{tittel}</span>

    if (!erKlikkbar) {
        return (
            <li className="smule">
                <span className="vekk">Du er her:</span>
                <span>{tittel}</span>
            </li>
        )
    } else if (erKlikkbar) {
        return (
            <li className="smule">{link}</li>
        )
    }
    return (
        <li className="smule">
            <span>{tittel}</span>
        </li>
    )
}

interface BrodsmulerProps {
    brodsmuler: Brodsmule[];
}

const Brodsmuler = ({ brodsmuler }: BrodsmulerProps) => {
    const [ synlige, setSynlige ] = useState<Brodsmule[]>([])
    const [ skjerm, setSkjerm ] = useState<number>()
    const smulesti = useRef<HTMLElement>(null)

    brodsmuler = faste.concat(brodsmuler)

    useEffect(() => {
        setSkjerm(window.innerWidth)
    }, [])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setSkjerm(window.innerWidth)
        })
        setSynlige(skjerm! <= LITEN ? [ brodsmuler[brodsmuler.length - 1] ] : brodsmuler)
        // eslint-disable-next-line
    }, [ skjerm ])

    const toggleSynlige = () => {
        if (synlige.length === brodsmuler.length) {
            setSynlige([ brodsmuler[brodsmuler.length - 1] ])
            smulesti.current!.classList.remove('apen')
        } else {
            setSynlige(brodsmuler)
            smulesti.current!.classList.add('apen')
        }
    }

    return (
        <nav className="brodsmuler" ref={smulesti} aria-label="Du er her: ">
            <div className="limit">
                <Person />
                <ul className="brodsmuler__smuler">
                    <BodyLong spacing size="small" className="brodsmuler__smuler">
                        <Vis hvis={skjerm! <= LITEN}
                            render={() =>
                                <li className="smule">
                                    <button
                                        aria-label={
                                            synlige.length === brodsmuler.length
                                                ? 'Vis redusert brødsmulesti'
                                                : 'Vis hele brødsmulestien'}
                                        className="js-toggle"
                                        onClick={toggleSynlige}
                                    >
                                        ...
                                    </button>
                                </li>
                            }
                        />

                        {synlige.map((smule, index) => {
                            return (
                                <BrodsmuleBit key={index}
                                    sti={smule.sti}
                                    tittel={
                                        skjerm! <= LITEN && smule.mobilTittel && !smulesti.current!.classList.contains('apen')
                                            ? smule.mobilTittel
                                            : smule.tittel
                                    }
                                />
                            )
                        })}
                    </BodyLong>
                </ul>

                <button
                    aria-label={
                        synlige.length === brodsmuler.length
                            ? 'Vis redusert brødsmulesti'
                            : 'Vis hele brødsmulestien'}
                    className="js-toggle"
                    onClick={toggleSynlige}
                >
                    <Collapse />
                </button>
            </div>
        </nav>
    )
}

export default Brodsmuler

export interface Brodsmule {
    sti?: string | UrlObject;
    tittel: string
    mobilTittel?: string
}
