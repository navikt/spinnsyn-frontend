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
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import useMerkVedtakSomLest from '../../query-hooks/useMerkVedtakSomLest'
import useVedtak from '../../query-hooks/useVedtak'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import env from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import AnnulleringsInfo from './annullering/annullering'
import AvvisteDager from './avviste-dager/avviste-dager'
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
    const { logEvent } = useAmplitudeInstance()
    const { id } = useParams<RouteParams>()
    const { data: vedtak } = useVedtak()
    const { valgtVedtak, setValgtVedtak } = useAppStore()
    const { mutate: merkLest } = useMerkVedtakSomLest()

    useEffect(() => {
        setBodyClass('vedtak-side')
        logEvent('skjema åpnet', { skjemanavn: 'vedtak' })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (vedtak) {
            const aktivtVedtak = vedtak.find(v => v.id === id)
            setValgtVedtak(aktivtVedtak)
        }
        // eslint-disable-next-line
    }, [ vedtak ])

    useEffect(() => {
        if (valgtVedtak && !valgtVedtak.lest) {
            merkLest(valgtVedtak.id)
        }
        // eslint-disable-next-line
    }, [ valgtVedtak ])

    if (!valgtVedtak) return null
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
                <Vis hvis={annullertEllerRevurdert}
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
                <AvvisteDager />
                <Sykepengedager />

                <Vis hvis={!annullertEllerRevurdert}
                    render={() =>
                        <>
                            <Uenig />
                            <Vis hvis={valgtVedtak.vedtak.utbetaling.automatiskBehandling}
                                render={() =>
                                    <AutomatiskBehandling />
                                }
                            />
                        </>
                    }
                />
                <Vis hvis={annullertEllerRevurdert && valgtVedtak.vedtak.utbetaling.automatiskBehandling}
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

