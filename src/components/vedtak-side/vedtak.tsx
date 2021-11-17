import { Element, Sidetittel, Systemtittel } from 'nav-frontend-typografi'
import React, { useContext } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { RSDagTypeKomplett, RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import { medQuery } from '../../utils/url-utils'
import { storeTilStoreOgSmå } from '../../utils/utils'
import Banner from '../banner/banner'
import BetaAlertstripe from '../beta-alertstripe/beta-alertstripe'
import Brodsmuler from '../brodsmuler/brodsmuler'
import TilbakeLenke from '../tilbake/tilbake-lenke'
import VedtakStatus from '../vedtak-status/vedtak-status'
import Vis from '../vis'
import AnnulleringsInfo from './annullering/annullering'
import AvvisteDager from './avviste-dager/avviste-dager'
import AutomatiskBehandling from './behandling/automatiskBehandling'
import AutomatiskBehandlingPreteritum from './behandling/automatiskBehandlingPreteritum'
import Sykepengedager from './sykepengedager/sykepengedager'
import Uenig from './uenig/uenig'
import { PersonutbetalingMedInntekt } from './utbetaling/personutbetaling-med-inntekt'
import RefusjonMedInntekt from './utbetaling/refusjon-med-inntekt'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('vedtak-liste.sidetittel'),
        sti: SEPARATOR + medQuery(),
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

export interface VedtakProps {
    vedtak: RSVedtakWrapper
}

const Vedtak = ({ vedtak }: VedtakProps) => {
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const avvisteDager = vedtak.dagerArbeidsgiver.filter(dag => dagErAvvist.includes(dag.dagtype))
    const erArkivering = useContext(ArkiveringContext)
    const periode = tilLesbarPeriodeMedArstall(vedtak?.vedtak.fom, vedtak?.vedtak.tom)

    return (
        <>
            <Vis hvis={!erArkivering}
                render={() =>
                    <>
                        <Banner>
                            <Sidetittel className="sidebanner__tittel">
                                {tekst('spinnsyn.sidetittel.vedtak')}
                            </Sidetittel>
                            <Element className="subtittel">
                                <span>{storeTilStoreOgSmå(vedtak.orgnavn)}&nbsp;</span>
                                <span>fra {periode}</span>
                            </Element>
                        </Banner>
                        <Brodsmuler brodsmuler={brodsmuler} />
                    </>
                }
            />

            <div className="limit">
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

                <Vis hvis={vedtak.sykepengebelopPerson > 0}
                    render={() =>
                        <PersonutbetalingMedInntekt vedtak={vedtak} />
                    }
                />
                <Vis hvis={vedtak.sykepengebelopArbeidsgiver > 0}
                    render={() =>
                        <RefusjonMedInntekt vedtak={vedtak} />
                    }
                />
                <Vis hvis={avvisteDager.length > 0}
                    render={() =>
                        <AvvisteDager avvisteDager={avvisteDager} vedtak={vedtak} />
                    }
                />

                <Sykepengedager vedtak={vedtak} />

                <Vis hvis={!annullertEllerRevurdert}
                    render={() =>
                        <>
                            <Uenig vedtak={vedtak} />
                            <Vis hvis={vedtak.vedtak.utbetaling.automatiskBehandling}
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
                <Vis hvis={!erArkivering}
                    render={() =>
                        <TilbakeLenke />
                    }
                />

            </div>
        </>
    )
}

export default Vedtak

