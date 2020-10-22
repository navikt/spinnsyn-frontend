import './vedtak-liste.less'

import parser from 'html-react-parser'
import AlertStripe from 'nav-frontend-alertstriper'
import { VenstreChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Element,Normaltekst, Sidetittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'

import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import SaksbehandlingstidOgUtbetaling
    from '../../components/teaser/saksbehandlingstid-og-utbetaling/saksbehandlingstid-og-utbetaling'
import Teasere from '../../components/teaser/teasere'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule } from '../../types/types'
import env from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('vedtak-liste.sidetittel'),
    sti: '/soknader',
    erKlikkbar: false
} ]

const VedtakListe = () => {
    const { vedtak, setValgtVedtak } = useAppStore()
    const uleste = vedtak.filter(v => v.lest === false)
    const leste = vedtak.filter(v => v.lest === true)

    useEffect(() => {
        setBodyClass('vedtak-liste')
    }, [])

    useEffect(() => {
        setValgtVedtak(undefined)
    }, [ setValgtVedtak ])

    return (
        <>
            <Banner>
                <Sidetittel className="sidebanner__tittel">
                    {tekst('spinnsyn.sidetittel.liste')}
                </Sidetittel>
            </Banner>
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <AlertStripe type="info" style={{ marginBottom: '2rem' }}>
                    <Element tag="h2" className="beta__tittel">
                        Du er kommet til en side som er under utvikling.
                    </Element>
                    <Normaltekst>{tekst('vedtak.betatekst')}</Normaltekst>
                    <Normaltekst>{parser(tekst('vedtak.betalenke'))}</Normaltekst>
                </AlertStripe>

                <Teasere
                    className="vedtak--uleste vedtak--teasere"
                    vedtak={uleste}
                    tittel={tekst('spinnsyn.teaser.uleste')}
                    tomListeTekst={tekst('vedtak-liste.ingen-soknader')}
                />

                <SaksbehandlingstidOgUtbetaling />

                <Teasere
                    className="vedtak--leste"
                    vedtak={leste}
                    tittel={tekst('spinnsyn.teaser.leste')}
                    tomListeTekst={tekst('vedtak-liste.ingen-soknader')}
                    kanSorteres={false}
                />

                <Lenke className="vedtak__tilbake" href={env.sykefravaerUrl}>
                    <VenstreChevron />
                    <Normaltekst className="vedtak__tilbake--lenke"> {tekst('vedtak.tilbake')} </Normaltekst>
                </Lenke>
            </div>
        </>
    )
}

export default VedtakListe
