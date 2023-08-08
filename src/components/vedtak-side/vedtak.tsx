import { Alert, BodyLong, BodyShort, Heading, Link } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { useUpdateBreadcrumbs, vedtakBreadcrumb } from '../../hooks/useBreadcrumbs'
import { RSDag, RSDagTypeKomplett, RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { tekst } from '../../utils/tekster'
import Person from '../person/Person'
import { UxSignalsWidget } from '../ux-signals/UxSignalsWidget'
import Vis from '../vis'
import { isProd } from '../../utils/environment'
import { useStudyStatus } from '../../hooks/useStudyStatus'
import { Feedback } from '../feedback/feedback'

import AnnulleringsInfo from './annullering/annullering'
import AvvisteDager from './avviste-dager/avviste-dager'
import { Behandling } from './behandling/behandling'
import Sykepengedager from './sykepengedager/sykepengedager'
import Uenig from './uenig/uenig'
import { PersonutbetalingMedInntekt } from './utbetaling/personutbetaling-med-inntekt'
import RefusjonMedInntekt from './utbetaling/refusjon-med-inntekt'
import { BegrunnelseForSkjonnsfastsetting } from './begrunnelse-for-skjonnsfastsetting/begrunnelse-for-skjonnsfastsetting'

const dagErAvvist: RSDagTypeKomplett[] = ['AvvistDag', 'Fridag', 'Feriedag', 'Permisjonsdag', 'ForeldetDag']

export interface VedtakProps {
    vedtak: RSVedtakWrapper
}

const Vedtak = ({ vedtak }: VedtakProps) => {
    const router = useRouter()
    const erArkivering = useContext(ArkiveringContext)
    const studyKey = 'study-hpyhgdokuq'
    const { data: studyActive } = useStudyStatus(studyKey)
    const query: NodeJS.Dict<string | string[]> = {}

    // unike avviste dager i fra dagerArbeidsgiver og dagerPerson, sortert på dato
    const avvisteDagerArbeidsgiver = vedtak.dagerArbeidsgiver.filter((dag) => dagErAvvist.includes(dag.dagtype))
    const avvisteDagerPerson = vedtak.dagerPerson.filter((dag) => dagErAvvist.includes(dag.dagtype))
    const avvisteDager = avvisteDagerPerson
        .reduce((list: RSDag[], dag: RSDag) => {
            if (list.find((d) => d.dato === dag.dato) === undefined) {
                list.push(dag)
            }
            return list
        }, avvisteDagerArbeidsgiver)
        .sort((a, b) => (a.dato < b.dato ? -1 : 1))

    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const nyesteRevudering = !vedtak.revurdert && vedtak.vedtak.utbetaling.utbetalingType === 'REVURDERING'
    const erDirekteutbetaling = vedtak.sykepengebelopPerson > 0
    const erRefusjon = vedtak.sykepengebelopArbeidsgiver > 0
    const harAvvisteDager = avvisteDager.length > 0

    useUpdateBreadcrumbs(() => [{ ...vedtakBreadcrumb, handleInApp: true }], [])

    useEffect(() => {
        // Scrollpoint beholdes når man går fra listevisning til vedtak. Nullstiller da det ser rart ut hvis vedtaket
        // er lengre enn det som vises i nettleser.
        window.scrollTo({ top: 0 })
    }, [])

    for (const key in router.query) {
        if (key != 'id') {
            query[key] = router.query[key]
        }
    }

    return (
        <>
            <Vis
                hvis={!erArkivering}
                render={() => (
                    <header className="mt-4 flex items-center justify-between pb-8 ">
                        <Heading size="xlarge" level="1">
                            {tekst('spinnsyn.sidetittel.vedtak')}
                        </Heading>
                        <Person />
                    </header>
                )}
            />

            <Vis
                hvis={!annullertEllerRevurdert}
                render={() => (
                    <>
                        <BodyLong size="medium">
                            {tekst('vedtak.velkommen.tekst1')}
                            {erDirekteutbetaling && erRefusjon && tekst('vedtak.velkommen.tekst2')}
                        </BodyLong>
                    </>
                )}
            />

            <Vis
                hvis={annullertEllerRevurdert}
                render={() => (
                    <>
                        <AnnulleringsInfo vedtak={vedtak} />
                        <Heading spacing size="large" level="2" className="tidligere__beslutning">
                            {tekst('annullert.se-tidligere-beslutning')}
                        </Heading>
                    </>
                )}
            />

            <Vis
                hvis={nyesteRevudering}
                render={() => (
                    <Alert variant="info" className="mt-4">
                        <BodyShort>{tekst('revurdert.alert.revurdert.nybeslutningtekst')}</BodyShort>
                        <Link href={tekst('revurdert.alert.link.url')}>
                            {tekst('revurdert.alert.revurdert.nybeslutninglenketekst')}
                        </Link>
                    </Alert>
                )}
            />

            <Vis hvis={erDirekteutbetaling} render={() => <PersonutbetalingMedInntekt vedtak={vedtak} />} />
            <Vis
                hvis={
                    erRefusjon ||
                    (!erDirekteutbetaling &&
                        !erRefusjon &&
                        !harAvvisteDager) /* vedtak med bare arbeidsgiverperiode dager */
                }
                render={() => <RefusjonMedInntekt vedtak={vedtak} />}
            />

            <BegrunnelseForSkjonnsfastsetting vedtak={vedtak} />

            <Vis
                hvis={harAvvisteDager}
                render={() => (
                    <AvvisteDager
                        avvisteDager={avvisteDager}
                        vedtak={vedtak}
                        heltAvvist={!erDirekteutbetaling && !erRefusjon}
                    />
                )}
            />

            <Sykepengedager vedtak={vedtak} />

            <Vis
                hvis={!erArkivering && erDirekteutbetaling && studyActive}
                render={() => <UxSignalsWidget study={studyKey} demo={!isProd()} />}
            />

            <Behandling vedtak={vedtak} />

            <Vis hvis={!annullertEllerRevurdert} render={() => <Uenig vedtak={vedtak} />} />

            <Feedback
                erDirekteutbetaling={erDirekteutbetaling}
                erRefusjon={erRefusjon}
                harAvvisteDager={harAvvisteDager}
                annullert={vedtak.annullert}
                revurdert={vedtak.revurdert}
            ></Feedback>
        </>
    )
}

export default Vedtak
