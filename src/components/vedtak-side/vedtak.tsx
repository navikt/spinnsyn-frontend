import { Alert, BodyLong, BodyShort, Heading, Link } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { useUpdateBreadcrumbs, vedtakBreadcrumb } from '../../hooks/useBreadcrumbs'
import { RSDagTypeKomplett, RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { tekst } from '../../utils/tekster'
import Person from '../person/Person'
import { UxSignalsWidget } from '../ux-signals/UxSignalsWidget'
import { isMockBackend, isOpplaering, isProd } from '../../utils/environment'
import { useStudyStatus } from '../../hooks/useStudyStatus'
import { useToggle } from '../../toggles/context'
import { FlexjarPohelseHelsemetrikk } from '../flexjar/flexjar-pohelse-helsemetrikk'
import { FlexjarVarSidenNyttig } from '../flexjar/flexjar-var-siden-nyttig'

import AnnulleringsInfo from './annullering/annullering'
import { Behandling } from './behandling/behandling'
import Sykepengedager from './sykepengedager/sykepengedager'
import Uenig from './uenig/uenig'
import { PersonutbetalingMedInntekt } from './utbetaling/personutbetaling-med-inntekt'
import RefusjonMedInntekt from './utbetaling/refusjon-med-inntekt'
import { InntekterLagtTilGrunn } from './inntekter-lagt-til-grunn/inntekter-lagt-til-grunn'
import { SporsmalEllerFeil } from './uenig/sporsmal-eller-feil'
import { skalViseJulesoknadWarning } from './julesoknad/skal-vise-julesoknad-warning'
import { JulesoknadWarning } from './julesoknad/julesoknad-warning'
import IngenUtbetaling from './utbetaling/ingen-utbetaling'

const dagErAvvist: RSDagTypeKomplett[] = ['AvvistDag', 'Fridag', 'Feriedag', 'Permisjonsdag', 'ForeldetDag']

export interface VedtakProps {
    vedtak: RSVedtakWrapper
}

export interface Utbetalingsdager {
    avvisteDager: number
    antallDager: number
}

const Vedtak = ({ vedtak }: VedtakProps) => {
    const router = useRouter()
    const erArkivering = useContext(ArkiveringContext)
    const studyKey = 'study-hpyhgdokuq'
    const { data: studyActive } = useStudyStatus(studyKey)
    const query: NodeJS.Dict<string | string[]> = {}

    const erAnnullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const erNyesteRevurdering = !vedtak.revurdert && vedtak.vedtak.utbetaling.utbetalingType === 'REVURDERING'

    const avvisteDagerArbeidsgiver = vedtak.dagerArbeidsgiver.filter((dag) => dagErAvvist.includes(dag.dagtype))
    const avvisteDagerPerson = vedtak.dagerPerson.filter((dag) => dagErAvvist.includes(dag.dagtype))
    const harIngenUtbetaling = vedtak.sykepengebelopArbeidsgiver === 0 && vedtak.sykepengebelopPerson === 0
    const harAvvisteDager = avvisteDagerArbeidsgiver.length > 0 || avvisteDagerPerson.length > 0
    const erDirekteutbetaling = vedtak.sykepengebelopPerson > 0
    const erRefusjon = vedtak.sykepengebelopArbeidsgiver > 0

    const harBareArbeidsgiverPeriodeDager = !erDirekteutbetaling && !erRefusjon && !harAvvisteDager
    const skalViseRefusjon = erRefusjon || harBareArbeidsgiverPeriodeDager

    const flexjarToggle = useToggle('flexjar-spinnsyn-frontend')
    const flexjarPohelseHelsemetrikkToggle = useToggle('flexjar-spinnsyn-pohelse-helsemetrikk')

    // TODO: Kan med fordel forenkles sånn at vi har ett objekt.
    const utbetalingsdagerPerson: Utbetalingsdager = {
        avvisteDager: avvisteDagerPerson.length,
        antallDager: vedtak.dagerPerson.length,
    }

    const utbetalingsdagerRefusjon: Utbetalingsdager = {
        avvisteDager: avvisteDagerArbeidsgiver.length,
        antallDager: vedtak.dagerArbeidsgiver.length,
    }

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
    const kanVelgePerson = isMockBackend() || isOpplaering()

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
            {!erAnnullertEllerRevurdert && (
                <>
                    <BodyLong size="medium">
                        {tekst('vedtak.velkommen.tekst1')}
                        {erDirekteutbetaling && erRefusjon && tekst('vedtak.velkommen.tekst2')}
                    </BodyLong>
                </>
            )}
            {skalViseJulesoknadWarning(vedtak) && <JulesoknadWarning />}
            {erAnnullertEllerRevurdert && (
                <>
                    <AnnulleringsInfo vedtak={vedtak} />
                    <Heading spacing size="large" level="2" className="tidligere__beslutning">
                        {tekst('annullert.se-tidligere-beslutning')}
                    </Heading>
                </>
            )}
            {erNyesteRevurdering && (
                <Alert variant="info" className="mt-4">
                    <BodyShort>{tekst('revurdert.alert.revurdert.nybeslutningtekst')}</BodyShort>
                    <Link href={tekst('revurdert.alert.link.url')}>
                        {tekst('revurdert.alert.revurdert.nybeslutninglenketekst')}
                    </Link>
                </Alert>
            )}

            {erDirekteutbetaling && (
                <PersonutbetalingMedInntekt vedtak={vedtak} utbetalingsdager={utbetalingsdagerRefusjon} />
            )}
            {skalViseRefusjon && <RefusjonMedInntekt vedtak={vedtak} utbetalingsdager={utbetalingsdagerPerson} />}
            {harIngenUtbetaling && <IngenUtbetaling vedtak={vedtak} />}

            <InntekterLagtTilGrunn vedtak={vedtak} />
            <Sykepengedager vedtak={vedtak} />
            {!erArkivering && erDirekteutbetaling && studyActive && (
                <UxSignalsWidget study={studyKey} demo={!isProd()} />
            )}
            <Behandling vedtak={vedtak} />
            {!erAnnullertEllerRevurdert && <SporsmalEllerFeil vedtak={vedtak} />}
            {!erAnnullertEllerRevurdert && <Uenig vedtak={vedtak} />}
            {flexjarToggle.enabled && (
                <FlexjarVarSidenNyttig
                    erDirekteutbetaling={erDirekteutbetaling}
                    erRefusjon={erRefusjon}
                    harAvvisteDager={harAvvisteDager}
                    annullert={vedtak.annullert}
                    revurdert={vedtak.revurdert}
                />
            )}
            {!flexjarToggle.enabled && flexjarPohelseHelsemetrikkToggle.enabled && (
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
