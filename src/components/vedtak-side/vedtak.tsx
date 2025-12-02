import { BodyLong, Detail, Heading } from '@navikt/ds-react'
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
import { erWeekendPeriode, fullDatoKlokkeslett } from '../../utils/dato-utils'
import { hentBegrunnelse } from '../../utils/vedtak-utils'
import { Etikett } from '../listevisning/listevisning-lenkepanel'

import { Behandling } from './behandling/behandling'
import Sykepengedager from './sykepengedager/sykepengedager'
import Uenig from './uenig/uenig'
import { PersonutbetalingMedInntekt } from './utbetaling/personutbetaling-med-inntekt'
import RefusjonMedInntekt from './utbetaling/refusjon-med-inntekt'
import { InntekterLagtTilGrunnArbeidstaker } from './inntekter-lagt-til-grunn/arbeidstaker/inntekter-lagt-til-grunn-arbeidstaker'
import { SporsmalEllerFeil } from './uenig/sporsmal-eller-feil'
import { IngenUtbetaling } from './utbetaling/ingen-utbetaling'
import { InntekterLagtTilGrunnNaringsdrivende } from './inntekter-lagt-til-grunn/naringsdrivende/inntekter-lagt-til-grunn-naringsdrivende'
import { VedtakAlertOgReadmore } from './vedtak-alert/vedtak-alert-og-readmore'
import { skalViseJulesoknadWarning } from './julesoknad/skal-vise-julesoknad-warning'

export const dagErAvvist: RSDagTypeKomplett[] = [
    'AvvistDag',
    'Feriedag',
    'Permisjonsdag',
    'ForeldetDag',
    'AndreYtelser',
]

export const dagErInnvilget: RSDagTypeKomplett[] = ['NavDag', 'NavDagSyk', 'NavDagDelvisSykUnder20', 'NavDagDelvisSyk']

export interface VedtakProps {
    vedtak: RSVedtakWrapperUtvidet
}

const Vedtak = ({ vedtak }: VedtakProps) => {
    const erArkivering = useContext(ArkiveringContext)
    const studyKey = 'panel-venlmwxjdo'
    const { data: studyActive } = useStudyStatus(studyKey)

    // Unike avviste dager i fra dagerArbeidsgiver og dagerPerson, sortert på dato
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
    const nyesteRevurdering = !vedtak.revurdert && vedtak.vedtak.utbetaling.utbetalingType === 'REVURDERING'
    const erDirekteutbetaling = vedtak.sykepengebelopPerson > 0
    const erRefusjon = vedtak.sykepengebelopArbeidsgiver > 0
    const harIngenUtbetaling = vedtak.sykepengebelopArbeidsgiver === 0 && vedtak.sykepengebelopPerson === 0
    const harAvvisteDager = avvisteDager.length > 0
    const erDelvisInnvilget = hentBegrunnelse(vedtak, 'DelvisInnvilgelse') !== undefined
    const flexjarToggle = useToggle('flexjar-spinnsyn-frontend')
    const flexjarPohelseHelsemetrikkToggle = useToggle('flexjar-spinnsyn-pohelse-helsemetrikk')
    const julesoknad = skalViseJulesoknadWarning(vedtak)

    useUpdateBreadcrumbs(() => [{ ...vedtakBreadcrumb, handleInApp: true }], [])

    useEffect(() => {
        // Scrollpoint beholdes når man går fra listevisning til vedtak. Nullstiller da det ser rart ut hvis vedtaket
        // er lengre enn det som vises i nettleser.
        window.scrollTo({ top: 0 })
    }, [])

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
            <Etikett
                size="small"
                annullert={vedtak.annullert}
                revurdert={vedtak.revurdert}
                revurdering={nyesteRevurdering}
                className="mb-4"
            />
            <Detail textColor="subtle" className="italic mb-8">
                Sendt fra Nav den {fullDatoKlokkeslett(vedtak.opprettetTimestamp)}
            </Detail>

            <VedtakAlertOgReadmore
                julesoknad={julesoknad}
                nyesteRevurdering={nyesteRevurdering}
                revurdert={vedtak.revurdert}
                annullert={vedtak.annullert}
            />
            {!annullertEllerRevurdert ? (
                <>
                    <BodyLong size="medium">
                        {tekst('vedtak.velkommen.tekst1')}
                        {erDirekteutbetaling && erRefusjon && tekst('vedtak.velkommen.tekst2')}
                    </BodyLong>
                </>
            ) : (
                <Heading spacing size="large" level="2">
                    Se hva som først ble besluttet
                </Heading>
            )}

            {erRefusjon && !erWeekendPeriode(vedtak.vedtak.fom, vedtak.vedtak.tom) && (
                <RefusjonMedInntekt vedtak={vedtak} />
            )}
            {erDirekteutbetaling && <PersonutbetalingMedInntekt vedtak={vedtak} />}
            {harIngenUtbetaling && <IngenUtbetaling vedtak={vedtak} />}
            {(() => {
                switch (vedtak.vedtak.yrkesaktivitetstype) {
                    case 'ARBEIDSTAKER':
                        return <InntekterLagtTilGrunnArbeidstaker vedtak={vedtak} />
                    case 'SELVSTENDIG':
                        return <InntekterLagtTilGrunnNaringsdrivende vedtak={vedtak} />
                }
            })()}
            <Sykepengedager vedtak={vedtak} />
            {!erArkivering && erDelvisInnvilget && studyActive && <UxSignalsWidget study={studyKey} demo={!isProd()} />}
            <Behandling vedtak={vedtak.vedtak} />
            {!annullertEllerRevurdert && <SporsmalEllerFeil vedtak={vedtak} />}
            {!annullertEllerRevurdert && <Uenig vedtak={vedtak} />}
            {(flexjarToggle.enabled || julesoknad) && (
                <FlexjarVarSidenNyttig
                    erDirekteutbetaling={erDirekteutbetaling}
                    erRefusjon={erRefusjon}
                    harAvvisteDager={harAvvisteDager}
                    annullert={vedtak.annullert}
                    erRevurdert={vedtak.revurdert}
                    erRevurdering={nyesteRevurdering}
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
