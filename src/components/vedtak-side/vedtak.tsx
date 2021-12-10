import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst, Sidetittel, Systemtittel, Undertittel } from 'nav-frontend-typografi'
import Veilederpanel from 'nav-frontend-veilederpanel'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { RSDagTypeKomplett, RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { storeTilStoreOgSmå } from '../../utils/store-små'
import { tekst } from '../../utils/tekster'
import Banner from '../banner/banner'
import Brodsmuler, { Brodsmule } from '../brodsmuler/brodsmuler'
import TilbakeLenke from '../tilbake/tilbake-lenke'
import Vis from '../vis'
import AnnulleringsInfo from './annullering/annullering'
import AvvisteDager from './avviste-dager/avviste-dager'
import { Behandling } from './behandling/behandling'
import Sykepengedager from './sykepengedager/sykepengedager'
import Uenig from './uenig/uenig'
import { PersonutbetalingMedInntekt } from './utbetaling/personutbetaling-med-inntekt'
import RefusjonMedInntekt from './utbetaling/refusjon-med-inntekt'


const dagErAvvist: RSDagTypeKomplett[] = [
    'AvvistDag',
    'Fridag',
    'Feriedag',
    'Permisjonsdag',
    'ForeldetDag',
]

export interface VedtakProps {
    vedtak: RSVedtakWrapper
}

const Vedtak = ({ vedtak }: VedtakProps) => {

    const router = useRouter()

    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const avvisteDager = vedtak.dagerArbeidsgiver.filter(dag => dagErAvvist.includes(dag.dagtype))
    const erArkivering = useContext(ArkiveringContext)
    const periode = tilLesbarPeriodeMedArstall(vedtak?.vedtak.fom, vedtak?.vedtak.tom)
    const query: NodeJS.Dict<string | string[]> = {}

    for (const key in router.query) {
        if (key != 'id') {
            query[ key ] = router.query[ key ]
        }
    }

    const brodsmuler: Brodsmule[] = [
        {
            tittel: tekst('vedtak-liste.sidetittel'),
            sti: { pathname: '/', query },
        }, {
            tittel: tekst('vedtak.sidetittel'),
        }
    ]
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

                <Vis hvis={vedtak.sykepengebelopPerson !== 0 && vedtak.sykepengebelopArbeidsgiver !== 0}
                    render={() =>
                        <Veilederpanel
                            fargetema="info"
                            type={'plakat'}
                            kompakt
                            svg={<img alt="" style={{ height: '100%' }} src={'/syk/sykepenger/static/img/male.svg'} />}
                        >
                            <Normaltekst>{tekst('vedtak.veileder.delvis.refusjon')}</Normaltekst>
                        </Veilederpanel>
                    }
                />

                <Vis hvis={vedtak.sykepengebelopPerson > 0}
                    render={() =>
                        <PersonutbetalingMedInntekt vedtak={vedtak} />
                    }
                />
                <Vis hvis={vedtak.sykepengebelopArbeidsgiver > 0 ||
                (vedtak.sykepengebelopPerson == 0
                    && vedtak.sykepengebelopArbeidsgiver == 0
                    && avvisteDager.length == 0)}
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
                        <Uenig vedtak={vedtak} />
                    }
                />


                <Behandling vedtak={vedtak} />


                <Undertittel className="utvikling__tittel">
                    {tekst('vedtak.utvikling.tittel')}
                </Undertittel>

                <Normaltekst>
                    {tekst('vedtak.utvikling.tekst')}
                    <Lenke href={tekst('vedtak.utvikling.lenke.url')} target="_blank" rel="noopener noreferrer">
                        {tekst('vedtak.utvikling.lenke')}
                    </Lenke>
                </Normaltekst>

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

