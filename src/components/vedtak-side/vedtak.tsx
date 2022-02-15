import { BodyLong, Heading } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { RSDagTypeKomplett, RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
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
            query[key] = router.query[key]
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
                        </Banner>
                        <Brodsmuler brodsmuler={brodsmuler} />
                    </>
                }
            />

            <div className="limit">
                <Vis hvis={!annullertEllerRevurdert}
                    render={() =>
                        <div className="velkommen">
                            <img src={'/syk/sykepenger/static/img/adult_people.svg'} alt="" />
                            <div className="velkommen-innhold">
                                <Heading size="small" as="h2">
                                    {tekst('vedtak.velkommen.tittel')}
                                </Heading>
                                <BodyLong size="medium">
                                    {tekst('vedtak.velkommen.tekst1')}
                                </BodyLong>
                                {/* TODO: fjern utkommentering
                                <BodyLong size="medium">
                                    {tekst('vedtak.velkommen.tekst2')}
                                </BodyLong>
                                */}
                            </div>
                        </div>
                    }
                />

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

                <Vis hvis={vedtak.sykepengebelopPerson > 0}
                    render={() =>
                        <PersonutbetalingMedInntekt vedtak={vedtak} />
                    }
                />
                {/* TODO: fjern utkommentering
                <Vis hvis={vedtak.sykepengebelopArbeidsgiver > 0 ||
                    (vedtak.sykepengebelopPerson === 0
                        && vedtak.sykepengebelopArbeidsgiver === 0
                        && avvisteDager.length === 0)} render={() => <RefusjonMedInntekt vedtak={vedtak} />}
                />
                */}
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

            </div>
        </>
    )
}

export default Vedtak

