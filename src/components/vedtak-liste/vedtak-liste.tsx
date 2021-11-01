import { Sidetittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'

import useVedtak from '../../query-hooks/useVedtak'
import { Brodsmule } from '../../types/types'
import { sorterEtterNyesteTom } from '../../utils/sorter-vedtak'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import Banner from '../banner/banner'
import BetaAlertstripe from '../beta-alertstripe/beta-alertstripe'
import Brodsmuler from '../brodsmuler/brodsmuler'
import SaksbehandlingstidOgUtbetaling
    from '../teaser/saksbehandlingstid-og-utbetaling/saksbehandlingstid-og-utbetaling'
import Teasere from '../teaser/teasere'
import TilbakeLenke from '../tilbake/tilbake-lenke'

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('vedtak-liste.sidetittel'),
    sti: '/soknader',
    erKlikkbar: false
} ]

const VedtakListe = () => {
    const { data: rsVedtak } = useVedtak()

    useEffect(() => {
        setBodyClass('vedtak-liste')
    }, [])

    if (!rsVedtak) return null

    const uleste = rsVedtak.filter(v => v.lest === false)
    const leste = rsVedtak.filter(v => v.lest === true).sort(sorterEtterNyesteTom)

    return (
        <>
            <Banner>
                <Sidetittel className="sidebanner__tittel">
                    {tekst('spinnsyn.sidetittel.liste')}
                </Sidetittel>
            </Banner>
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <BetaAlertstripe />

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
