import { BodyLong, GuidePanel, Heading, Label } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { RSDagTypeKomplett, RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { storeTilStoreOgSmå } from '../../utils/store-små'
import { tekst } from '../../utils/tekster'
import Banner from '../banner/banner'
import Brodsmuler, { Brodsmule } from '../brodsmuler/brodsmuler'
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
    const erArkivering = useContext(ArkiveringContext)
    const periode = tilLesbarPeriodeMedArstall(vedtak?.vedtak.fom, vedtak?.vedtak.tom)
    const query: NodeJS.Dict<string | string[]> = {}

    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const avvisteDager = vedtak.dagerArbeidsgiver.filter(dag => dagErAvvist.includes(dag.dagtype))
    const erSP = vedtak.sykepengebelopPerson > 0
    const erSPREF = vedtak.sykepengebelopArbeidsgiver > 0
    const erAvvist = avvisteDager.length > 0

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
                            <Heading spacing size="2xlarge" level="1" className="sidebanner__tittel">
                                {tekst('spinnsyn.sidetittel.vedtak')}
                            </Heading>
                            <Label spacing className="subtittel">
                                <span>{storeTilStoreOgSmå(vedtak.orgnavn)}&nbsp;</span>
                                <span>fra {periode}</span>
                            </Label>
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
                            <Heading spacing size="large" level="2" className="tidligere__beslutning">
                                {tekst('annullering.se-tidligere-beslutning')}
                            </Heading>
                        </>
                    }
                />

                <Vis hvis={erSP && erSPREF}
                    render={() =>
                        <GuidePanel poster
                            illustration={<img src={'/syk/sykepenger/static/img/male.svg'} alt="" />}
                        >
                            <BodyLong spacing size="small">
                                {tekst('vedtak.veileder.delvis.refusjon')}
                            </BodyLong>
                        </GuidePanel>
                    }
                />

                <Vis hvis={erSP}
                    render={() =>
                        <PersonutbetalingMedInntekt vedtak={vedtak} />
                    }
                />
                <Vis hvis={erSPREF || (!erSP && !erSPREF && !erAvvist)/* vedtak med bare arbeidsgiverperiode dager */}
                    render={() =>
                        <RefusjonMedInntekt vedtak={vedtak} />
                    }
                />
                <Vis hvis={erAvvist}
                    render={() =>
                        <AvvisteDager
                            avvisteDager={avvisteDager}
                            vedtak={vedtak}
                            heltAvvist={!erSP && !erSPREF}
                        />
                    }
                />

                <Sykepengedager vedtak={vedtak} />

                <Behandling vedtak={vedtak} />

                <Vis hvis={!annullertEllerRevurdert}
                    render={() =>
                        <Uenig vedtak={vedtak} />
                    }
                />
            </div>
        </>
    )
}

export default Vedtak

