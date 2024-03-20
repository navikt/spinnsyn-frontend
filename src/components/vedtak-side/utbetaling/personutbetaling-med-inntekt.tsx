import { BodyShort, Heading } from '@navikt/ds-react'
import React, { useContext } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { Utbetalingsdager, VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import { spinnsynFrontendInterne } from '../../../utils/environment'
import UtbetalingPanel from '../../panel/utbetaling-panel'

import { SykepengerTrekk } from './sykepenger-trekk'
import { Kontonummer } from './kontonummer'
import { SykepengerNar } from './accordion/sykepenger-nar'
import { DelvisUtbetaling } from './delvis-utbetaling'

export const PersonutbetalingMedInntekt = ({
    vedtak,
    utbetalingsdager,
}: VedtakProps & {
    utbetalingsdager: Utbetalingsdager
}) => {
    const erArkivering = useContext(ArkiveringContext)
    const erInterne = spinnsynFrontendInterne()
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const erDelvisInnvilget = utbetalingsdager.avvisteDager > 0
    const belop = ValutaFormat.format(vedtak.sykepengebelopPerson)
    const etterSkjønn = vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt == 'EtterSkjønn'

    return (
        <UtbetalingPanel
            sectionLabel="Utbetaling til deg"
            tittel={
                <Heading data-cy="header-sykepenger-til-deg" level="2" size="large">
                    {annullertEllerRevurdert ? (
                        <del>
                            {belop + ' kroner'}
                            <span className="sr-only">(ikke gjeldende)</span>
                        </del>
                    ) : (
                        <span>{belop + ' kroner'}</span>
                    )}
                    <BodyShort as="span" className="block">
                        {tekst('utbetaling.person.systemtittel')}
                    </BodyShort>
                </Heading>
            }
            erUgyldig={vedtak.revurdert || vedtak.annullert}
            dataCy="personutbetaling"
        >
            <VedtakPeriode vedtak={vedtak} skalViseRefusjonsMottaker={true} />
            <DelvisUtbetaling
                erDelvisInnvilget={erDelvisInnvilget}
                etterSkjønn={etterSkjønn}
                utbetalingsdager={utbetalingsdager}
            />
            <SykepengerTrekk />
            {!erInterne && !erArkivering && <Kontonummer />}
            <SykepengerNar />
        </UtbetalingPanel>
    )
}
