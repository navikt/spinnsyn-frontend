import { Alert, BodyLong, BodyShort, Heading, Link } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { useUpdateBreadcrumbs, vedtakBreadcrumb } from '../../hooks/useBreadcrumbs'
import { RSDag, RSDagTypeKomplett, RSVedtakWrapperUtvidet } from '../../types/rs-types/rs-vedtak-felles'
import { tekst } from '../../utils/tekster'
import Person from '../person/Person'
import { UxSignalsWidget } from '../ux-signals/UxSignalsWidget'
import { isMockBackend, isOpplaering, isProd } from '../../utils/environment'
import { useStudyStatus } from '../../hooks/useStudyStatus'
import { useToggle } from '../../toggles/context'
import { FlexjarPohelseHelsemetrikk } from '../flexjar/flexjar-pohelse-helsemetrikk'
import { FlexjarVarSidenNyttig } from '../flexjar/flexjar-var-siden-nyttig'
import { erWeekendPeriode } from '../../utils/dato-utils'

import AnnulleringsInfo from './annullering/annullering'
import AvvisteDager from './avviste-dager/avviste-dager'
import { Behandling } from './behandling/behandling'
import Sykepengedager from './sykepengedager/sykepengedager'
import Uenig from './uenig/uenig'
import { PersonutbetalingMedInntekt } from './utbetaling/personutbetaling-med-inntekt'
import RefusjonMedInntekt from './utbetaling/refusjon-med-inntekt'
import { InntekterLagtTilGrunn } from './inntekter-lagt-til-grunn/inntekter-lagt-til-grunn'
import { SporsmalEllerFeil } from './uenig/sporsmal-eller-feil'
import { skalViseJulesoknadWarning } from './julesoknad/skal-vise-julesoknad-warning'
import { JulesoknadWarning } from './julesoknad/julesoknad-warning'
import { IngenUtbetaling } from './utbetaling/ingen-utbetaling'

const dagErAvvist: RSDagTypeKomplett[] = [
    'AvvistDag',
    'Fridag',
    'Feriedag',
    'Permisjonsdag',
    'ForeldetDag',
    'AndreYtelser',
]

export interface VedtakProps {
    vedtak: RSVedtakWrapperUtvidet
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
    const ingenUtbetaling = vedtak.sykepengebelopArbeidsgiver === 0 && vedtak.sykepengebelopPerson === 0
    const harAvvisteDager = avvisteDager.length > 0

    const flexjarToggle = useToggle('flexjar-spinnsyn-frontend')
    const flexjarPohelseHelsemetrikkToggle = useToggle('flexjar-spinnsyn-pohelse-helsemetrikk')

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

    const vedtakMedBareArbeidsgiverperiodedager = !erDirekteutbetaling && !erRefusjon && !harAvvisteDager
    const skalViseRefusjon = erRefusjon || vedtakMedBareArbeidsgiverperiodedager
    const kanVelgePerson = isMockBackend() || isOpplaering()

    const julesoknad = skalViseJulesoknadWarning(vedtak)
    return (
        <>
            {!erArkivering && (
                <div className="mt-4 flex items-center justify-between pb-8 ">
                    <Heading size="xlarge" level="1">
                        {tekst('spinnsyn.sidetittel.vedtak')}
                    </Heading>
                    {kanVelgePerson && <Person />}
                </div>
            )}
            {!annullertEllerRevurdert && (
                <>
                    <BodyLong size="medium">
                        {tekst('vedtak.velkommen.tekst1')}
                        {erDirekteutbetaling && erRefusjon && tekst('vedtak.velkommen.tekst2')}
                    </BodyLong>
                </>
            )}
            {julesoknad && <JulesoknadWarning />}
            {annullertEllerRevurdert && (
                <>
                    <AnnulleringsInfo vedtak={vedtak} />
                    <Heading spacing size="large" level="2" className="tidligere__beslutning">
                        {tekst('annullert.se-tidligere-beslutning')}
                    </Heading>
                </>
            )}
            {nyesteRevudering && (
                <Alert variant="info" className="mt-4">
                    <BodyShort>{tekst('revurdert.alert.revurdert.nybeslutningtekst')}</BodyShort>
                    <Link href={tekst('revurdert.alert.link.url')}>
                        {tekst('revurdert.alert.revurdert.nybeslutninglenketekst')}
                    </Link>
                </Alert>
            )}

            {skalViseRefusjon && !erWeekendPeriode(vedtak.vedtak.fom, vedtak.vedtak.tom) && (
                <RefusjonMedInntekt vedtak={vedtak} />
            )}

            {erDirekteutbetaling && <PersonutbetalingMedInntekt vedtak={vedtak} />}

            {ingenUtbetaling && <IngenUtbetaling vedtak={vedtak} />}
            <InntekterLagtTilGrunn vedtak={vedtak} />
            {harAvvisteDager && <AvvisteDager avvisteDager={avvisteDager} vedtak={vedtak} />}
            <Sykepengedager vedtak={vedtak} />
            {!erArkivering && erDirekteutbetaling && studyActive && (
                <UxSignalsWidget study={studyKey} demo={!isProd()} />
            )}
            <Behandling vedtak={vedtak} />
            {!annullertEllerRevurdert && <SporsmalEllerFeil vedtak={vedtak} />}
            {!annullertEllerRevurdert && <Uenig vedtak={vedtak} />}
            {(flexjarToggle.enabled || julesoknad) && (
                <FlexjarVarSidenNyttig
                    erDirekteutbetaling={erDirekteutbetaling}
                    erRefusjon={erRefusjon}
                    harAvvisteDager={harAvvisteDager}
                    annullert={vedtak.annullert}
                    revurdert={vedtak.revurdert}
                    julesoknad={julesoknad}
                />
            )}
            {!flexjarToggle.enabled && flexjarPohelseHelsemetrikkToggle.enabled && !julesoknad && (
                <FlexjarPohelseHelsemetrikk
                    erDirekteutbetaling={erDirekteutbetaling}
                    erRefusjon={erRefusjon}
                    harAvvisteDager={harAvvisteDager}
                    annullert={vedtak.annullert}
                    revurdert={vedtak.revurdert}
                />
            )}
        </>
    )
}

export default Vedtak
