import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { Personalia } from '../../../../types/types'
import { isMockBackend, isProd } from '../../../../utils/environment'
import { tekst } from '../../../../utils/tekster'
import Vis from '../../../vis'

const Kontonummer = () => {
    const [ kontonummer, setKontonummer ] = useState<string>()

    useEffect(() => {
        hentKontonummer()
    }, [])

    async function hentKontonummer() {
        if (isProd()) {
            // Hardkoder URL da dette er data som kun finnes i produksjon.
            const res = await fetch('https://www.nav.no/person/personopplysninger-api/personalia', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })
            const data: Personalia = await res.json()
            setKontonummer(data?.personalia?.kontonr)
        }

        if (isMockBackend()) {
            setKontonummer('10010110001')
        }
    }

    const formaterKontonummer = (kontonummer: string) =>
        kontonummer.replace(/^(.{4})(.{2})(.*)$/, '$1 $2 $3')

    return (
        <>
            <Vis hvis={kontonummer} render={() =>
                <Normaltekst>
                    <strong>{tekst('utbetaling.kontonummer.utbetales')}</strong> {formaterKontonummer(kontonummer!)}
                </Normaltekst>
            } />

            <Vis hvis={!kontonummer} render={() =>
                <>
                    <Element tag="h2" className="info__tittel">
                        {tekst('utbetaling.kontonummer.tittel')}
                    </Element>
                    <Normaltekst>
                        {parser(tekst('utbetaling.kontonummer.mangler'))}
                    </Normaltekst>
                </>
            } />
        </>
    )
}

export default Kontonummer

