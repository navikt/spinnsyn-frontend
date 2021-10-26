
import { VenstreChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'

import Banner from '../../components/banner/banner'
import BetaAlertstripe from '../../components/beta-alertstripe/beta-alertstripe'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import SaksbehandlingstidOgUtbetaling
    from '../../components/teaser/saksbehandlingstid-og-utbetaling/saksbehandlingstid-og-utbetaling'
import Teasere from '../../components/teaser/teasere'
import useVedtak from '../../query-hooks/useVedtak'
import { Brodsmule } from '../../types/types'
import { sorterEtterNyesteTom } from '../../utils/sorter-vedtak'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import {sykefravaerUrl} from "../../utils/environment";

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

                <Lenke className="vedtak__tilbake" href={sykefravaerUrl()}>
                    <VenstreChevron />
                    <Normaltekst className="vedtak__tilbake--lenke"> {tekst('vedtak.tilbake')} </Normaltekst>
                </Lenke>
            </div>
        </>
    )
}

export default VedtakListe
