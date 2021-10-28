
import { VenstreChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst, Sidetittel, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppStore } from '../../data/stores/app-store'
import useMerkVedtakSomLest from '../../query-hooks/useMerkVedtakSomLest'
import useVedtak from '../../query-hooks/useVedtak'
import { RSDagTypeKomplett } from '../../types/rs-types/rs-vedtak'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { sykefravaerUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import { RouteParams } from '../app'
import Banner from '../banner/banner'
import BetaAlertstripe from '../beta-alertstripe/beta-alertstripe'
import Brodsmuler from '../brodsmuler/brodsmuler'
import VedtakStatus from '../vedtak-status/vedtak-status'
import Vis from '../vis'
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

const dagErAvvist: RSDagTypeKomplett[] = [
    'AvvistDag',
    'Fridag',
    'ForeldetDag',
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
    const avvisteDager = valgtVedtak.dager.filter(dag => dagErAvvist.includes(dag.dagtype))

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

                <Vis hvis={valgtVedtak.antallDagerMedUtbetaling > 0}
                    render={() =>
                        <UtbetalingMedInntekt />
                    }
                />
                <Vis hvis={avvisteDager.length > 0}
                    render={() =>
                        <AvvisteDager avvisteDager={avvisteDager} />
                    }
                />
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
                <Lenke className="vedtak__tilbake" href={sykefravaerUrl()}>
                    <VenstreChevron />
                    <Normaltekst className="vedtak__tilbake--lenke"> {tekst('vedtak.tilbake')} </Normaltekst>
                </Lenke>
            </div>
        </>
    )
}

export default VedtakSide

