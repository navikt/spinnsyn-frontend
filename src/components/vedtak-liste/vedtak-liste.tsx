import { Sidetittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'

import useVedtak from '../../query-hooks/useVedtak'
import { sorterEtterNyesteTom } from '../../utils/sorter-vedtak'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import Banner from '../banner/banner'
import Brodsmuler, { Brodsmule } from '../brodsmuler/brodsmuler'
import SaksbehandlingstidOgUtbetaling
    from '../teaser/saksbehandlingstid-og-utbetaling/saksbehandlingstid-og-utbetaling'
import Teasere from '../teaser/teasere'
import TilbakeLenke from '../tilbake/tilbake-lenke'

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('vedtak-liste.sidetittel')
} ]


const VedtakListe = () => {

    const { data: vedtak } = useVedtak()


    useEffect(() => {
        setBodyClass('vedtak-liste')
    }, [])


    const uleste = vedtak!.filter(v => !v.lest)
    const leste = vedtak!.filter(v => v.lest).sort(sorterEtterNyesteTom)

    return (
        <>
            <Banner>
                <Sidetittel className="sidebanner__tittel">
                    {tekst('spinnsyn.sidetittel.liste')}
                </Sidetittel>
            </Banner>
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <Teasere
                    className="vedtak--uleste vedtak--teasere"
                    vedtak={uleste}
                    tittel={tekst('spinnsyn.teaser.uleste')}
                    tomListeTekst={tekst('vedtak-liste.ingen-nye-soknader')}
                />

                <SaksbehandlingstidOgUtbetaling />

                <Teasere
                    className="vedtak--leste"
                    vedtak={leste}
                    tittel={tekst('spinnsyn.teaser.leste')}
                    tomListeTekst={tekst('vedtak-liste.ingen-tidligere-soknader')}
                />

                <TilbakeLenke />
            </div>
        </>
    )
}

export default VedtakListe
