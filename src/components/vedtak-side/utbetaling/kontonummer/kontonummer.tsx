import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { Brukerkonto } from '../../../../types/types'
import { isProd } from '../../../../utils/environment'
import { tekst } from '../../../../utils/tekster'
import Vis from '../../../vis'

const Kontonummer = () => {
    const [ kontonummer, setKontonummer ] = useState<string>()
    const [ erKontonummerHentet, setErKontonummerHentet ] = useState<boolean>(false)

    const hentKontonummer = async(url: string) => {
        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })

        // Det returneres 404 hvis det ikke ble funnet noe kontonummer.
        if (res.status !== 200) {
            return null
        }

        const data: Brukerkonto = await res.json()
        return (data?.kontonummer)
    }

    useEffect(() => {
        hentKontonummer(lagApiRouteUrl())
            .then(kontonummer => {
                setErKontonummerHentet(true)
                setKontonummer(kontonummer!)
            })
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

    const formaterKontonummer = (kontonummer: string) =>
        kontonummer.replace(/^(.{4})(.{2})(.*)$/, '$1 $2 $3')

    return (
        <Vis hvis={erKontonummerHentet} render={() =>
            <>
                <Vis hvis={kontonummer} render={() =>
                    <Normaltekst>
                        <strong>{tekst('utbetaling.kontonummer.utbetales')}</strong> {formaterKontonummer(kontonummer!)}
                    </Normaltekst>
                } />

                <Vis hvis={!kontonummer} render={() =>
                    <>
                        <Element tag="h2">
                            {tekst('utbetaling.kontonummer.tittel')}
                        </Element>
                        <Normaltekst>
                            {parser(tekst('utbetaling.kontonummer.mangler'))}
                        </Normaltekst>
                    </>
                } />
            </>
        } />
    )
}

export default Kontonummer

