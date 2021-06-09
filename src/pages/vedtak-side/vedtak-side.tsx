import './vedtak-side.less'

import { VenstreChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst, Sidetittel, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAmplitudeInstance } from '../../components/amplitude/amplitude'
import Banner from '../../components/banner/banner'
import BetaAlertstripe from '../../components/beta-alertstripe/beta-alertstripe'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import VedtakStatus from '../../components/vedtak-status/vedtak-status'
import Vis2 from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import { redirectTilLoginHvis401, setBodyClass } from '../../utils/utils'
import AnnulleringsInfo from './annullering/annullering'
import AutomatiskBehandling from './behandling/automatiskBehandling'
import AutomatiskBehandlingPreteritum from './behandling/automatiskBehandlingPreteritum'
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
    const { logEvent } = useAmplitudeInstance()
    const { valgtVedtak, setValgtVedtak, rsVedtak, setRsVedtak } = useAppStore()

    useEffect(() => {
        setBodyClass('vedtak-side')
        logEvent('skjema åpnet', { skjemanavn: 'vedtak' })
    }, [ logEvent ])

    useEffect(() => {
        const aktivtVedtak = rsVedtak.find(a => a.id === id)
        setValgtVedtak(aktivtVedtak)

        if (aktivtVedtak && !aktivtVedtak.lest) {
            const merkVedtakSomLest = async() => {
                const res = await fetch(`${env.flexGatewayRoot}/spinnsyn-backend/api/v2/vedtak/${aktivtVedtak.id}/les`, {
                    method: 'POST',
                    credentials: 'include',
                })
                const status = res.status
                if (redirectTilLoginHvis401(res)) {
                    return
                } else if (status === 200) {
                    aktivtVedtak.lest = true
                    setValgtVedtak(aktivtVedtak)
                    rsVedtak.find(a => a.id === id)!.lest = true
                    setRsVedtak(rsVedtak)
                } else {
                    logger.error('Feil ved markering av vedtak som lest. Ikke status 200', res)
                }
            }
            merkVedtakSomLest().catch(r => logger.error('Feil ved markering av vedtak som lest async', r))
        }
        // eslint-disable-next-line
    }, [])

    if (valgtVedtak === undefined) return null
    const annullertEllerRevurdert = valgtVedtak.annullert || valgtVedtak.revurdert

    return (
        <>
            <Banner>
                <Sidetittel className="sidebanner__tittel">{tekst('spinnsyn.sidetittel.vedtak')}</Sidetittel>
            </Banner>
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <BetaAlertstripe />

                <VedtakStatus />
                <Vis2 hvis={annullertEllerRevurdert}
                    render={() =>
                        <>
                            <AnnulleringsInfo />
                            <Systemtittel className="tidligere__beslutning">
                                {tekst('annullering.se-tidligere-beslutning')}
                            </Systemtittel>
                        </>
                    }
                />

                <UtbetalingMedInntekt ekspandert={false} />
                <Sykepengedager />

                <Vis2 hvis={!annullertEllerRevurdert}
                    render={() =>
                        <>
                            <Uenig />
                            <Vis2 hvis={valgtVedtak.vedtak.utbetaling.automatiskBehandling}
                                render={() =>
                                    <AutomatiskBehandling />
                                }
                            />
                        </>
                    }
                />
                <Vis2 hvis={annullertEllerRevurdert && valgtVedtak.vedtak.utbetaling.automatiskBehandling}
                    render={() =>
                        <AutomatiskBehandlingPreteritum />
                    }
                />
                <Lenke className="vedtak__tilbake" href={env.sykefravaerUrl}>
                    <VenstreChevron />
                    <Normaltekst className="vedtak__tilbake--lenke"> {tekst('vedtak.tilbake')} </Normaltekst>
                </Lenke>
            </div>
        </>
    )
}

export default VedtakSide

