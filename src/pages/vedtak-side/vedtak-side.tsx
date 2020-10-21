import './vedtak-side.less'

import AlertStripe from 'nav-frontend-alertstriper'
import { VenstreChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import VedtakStatus from '../../components/vedtak-status/vedtak-status'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import { redirectTilLoginHvis401, setBodyClass } from '../../utils/utils'
import Behandling from './behandling/behandling'
import Sykepengedager from './sykepengedager/sykepengedager'
import Uenig from './uenig/uenig'
import UtbetalingMedInntekt from './utbetaling/utbetaling-med-inntekt'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('vedtak-liste.sidetittel'),
        sti: SEPARATOR,
        erKlikkbar: true
    }, {
        tittel: tekst('vedtak.sidetittel'),
        sti: '/vedtak',
        erKlikkbar: false
    }
]

const VedtakSide = () => {
    const { id } = useParams<RouteParams>()
    const { valgtVedtak, setValgtVedtak, vedtak, setVedtak, inntektsmeldinger, setValgtInntektsmelding } = useAppStore()

    useEffect(() => {
        setBodyClass('vedtak-side')
    }, [])

    useEffect(() => {
        const aktivtVedtak = vedtak.find(a => a.id === id)
        setValgtVedtak(aktivtVedtak)
        setValgtInntektsmelding(inntektsmeldinger.find((i =>
                aktivtVedtak?.vedtak.dokumenter.find(d =>
                    d.type === 'Inntektsmelding' && i.id === d.dokumentId
                )
        )))

        if (aktivtVedtak && !aktivtVedtak.lest) {
            const merkVedtakSomLest = async() => {
                const res = await fetch(`${env.spinnsynRoot}/api/v1/vedtak/${aktivtVedtak.id}/les`, {
                    method: 'POST',
                    credentials: 'include',
                })
                const status = res.status
                if (redirectTilLoginHvis401(res)) {
                    return
                } else if (status === 200) {
                    aktivtVedtak.lest = true
                    setValgtVedtak(aktivtVedtak)
                    vedtak.find(a => a.id === id)!.lest = true
                    setVedtak(vedtak)
                } else {
                    logger.error('Feil ved markering av vedtak som lest. Ikke status 200', res)
                }
            }
            merkVedtakSomLest().catch(r => logger.error('Feil ved markering av vedtak som lest async', r))
        }
        // eslint-disable-next-line
    }, [])

    if (valgtVedtak === undefined) return null

    return (
        <>
            <Banner>
                <Sidetittel className="sidebanner__tittel">{tekst('spinnsyn.sidetittel.vedtak')}</Sidetittel>
            </Banner>
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <AlertStripe type="info" style={{ marginBottom: '2rem' }}>
                    Du er kommet til en side som er under utvikling. Mangler og feil kan forekomme. Etter hvert vil siden få mer innhold.
                </AlertStripe>

                <VedtakStatus />

                <UtbetalingMedInntekt ekspandert={false} />
                <Sykepengedager />

                <Uenig />
                <Behandling />

                <Lenke className="vedtak__tilbake" href={env.sykefravaerUrl}>
                    <VenstreChevron />
                    <Normaltekst className="vedtak__tilbake--lenke"> {tekst('vedtak.tilbake')} </Normaltekst>
                </Lenke>
            </div>
        </>
    )
}

export default VedtakSide

