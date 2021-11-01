import { Sidetittel, Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import Banner from '../components/banner/banner'
import BetaAlertstripe from '../components/beta-alertstripe/beta-alertstripe'
import AnnulleringsInfo from '../components/vedtak-side/annullering/annullering'
import AvvisteDager from '../components/vedtak-side/avviste-dager/avviste-dager'
import AutomatiskBehandling from '../components/vedtak-side/behandling/automatiskBehandling'
import AutomatiskBehandlingPreteritum from '../components/vedtak-side/behandling/automatiskBehandlingPreteritum'
import Sykepengedager from '../components/vedtak-side/sykepengedager/sykepengedager'
import Uenig from '../components/vedtak-side/uenig/uenig'
import UtbetalingMedInntekt from '../components/vedtak-side/utbetaling/utbetaling-med-inntekt'
import VedtakStatus from '../components/vedtak-status/vedtak-status'
import Vis from '../components/vis'
import { ArkiveringContext } from '../context/arkivering-context'
import { vedtakMed40Grad } from '../data/mock/data/rs-vedtak'
import { RSDagTypeKomplett, RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { tekst } from '../utils/tekster'

const dagErAvvist: RSDagTypeKomplett[] = [
    'AvvistDag',
    'Fridag',
    'ForeldetDag',
]

export interface ServerVedtakProps {
    vedtak: RSVedtakWrapper
}

const ServerVedtak = ({ vedtak }: ServerVedtakProps) => {
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const avvisteDager = vedtak.dager?.filter(dag => dagErAvvist.includes(dag.dagtype))

    return (
        <ArkiveringContext.Provider value={true}>
            <Banner>
                <Sidetittel className="sidebanner__tittel">{tekst('spinnsyn.sidetittel.vedtak')}</Sidetittel>
            </Banner>

            <div className="limit server-vedtak">
                <BetaAlertstripe />

                <VedtakStatus vedtak={vedtak} />

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

                <Vis hvis={vedtak.antallDagerMedUtbetaling > 0}
                    render={() =>
                        <UtbetalingMedInntekt vedtak={vedtak} />
                    }
                />
                <Vis hvis={avvisteDager?.length > 0}
                    render={() =>
                        <AvvisteDager avvisteDager={avvisteDager} />
                    }
                />

                <Sykepengedager vedtak={vedtak} />

                <Vis hvis={!annullertEllerRevurdert}
                    render={() =>
                        <>
                            <Uenig />
                            <Vis hvis={vedtak.vedtak.utbetaling?.automatiskBehandling}
                                render={() =>
                                    <AutomatiskBehandling />
                                }
                            />
                        </>
                    }
                />
                <Vis hvis={annullertEllerRevurdert && vedtak.vedtak.utbetaling.automatiskBehandling}
                    render={() =>
                        <AutomatiskBehandlingPreteritum />
                    }
                />
            </div>
        </ArkiveringContext.Provider>
    )
}

export async function getStaticProps() {
    const vedtak = vedtakMed40Grad

    return {
        props: {
            vedtak,
        },
    }
}

export default ServerVedtak
