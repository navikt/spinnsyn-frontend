import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { Brukerkonto } from '../../../../types/types'
import { isProd } from '../../../../utils/environment'
import { tekst } from '../../../../utils/tekster'
import Vis from '../../../vis'

const Kontonummer = () => {
    const [ kontonummer, setKontonummer ] = useState<string>()

    useEffect(() => {
        hentKontonummer(lagApiRouteUrl())
            .then(kontonummer => setKontonummer(kontonummer!))
    }, [])

    const lagApiRouteUrl = () => {
        const apiRouteUrl = '/syk/sykepenger/api/v1/kontonummer'

        if (isProd()) {
            return apiRouteUrl
        }
        const url = new URL(window.location.href)
        const id = url.searchParams.get('id')
        return `${apiRouteUrl}?id=${id}`
    }

    async function hentKontonummer(url: string) {
        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })

        const data: Brukerkonto = await res.json()
        return (data?.kontonummer)
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

