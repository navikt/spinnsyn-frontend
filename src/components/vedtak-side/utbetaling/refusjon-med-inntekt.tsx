import { BodyShort, Heading, List } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { Utbetalingsdager, VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import UtbetalingPanel from '../../panel/utbetaling-panel'

import { ArbeidsgiverInfo } from './arbeidsgiver-info'
import { DelvisUtbetaling } from './delvis-utbetaling'

export const RefusjonMedInntekt = ({
    vedtak,
    utbetalingsdager,
}: VedtakProps & {
    utbetalingsdager: Utbetalingsdager
}) => {
    const belop = ValutaFormat.format(vedtak.sykepengebelopArbeidsgiver)
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const erDelvisInnvilget = utbetalingsdager.avvisteDager > 0
    const etterSkjønn = vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt == 'EtterSkjønn'

    return (
        <UtbetalingPanel
            sectionLabel="Refusjon til arbeidsgiver"
            tittel={
                <Heading level="2" size="large">
                    {annullertEllerRevurdert ? (
                        <del>
                            {belop + ' kroner'}
                            <span className="sr-only">(ikke gjeldende)</span>
                        </del>
                    ) : (
                        <span>{belop + ' kroner'}</span>
                    )}
                    {vedtak.sykepengebelopArbeidsgiver > 0 && (
                        <BodyShort as="span" className="block">
                            {getLedetekst(tekst('utbetaling.arbeidsgiver.systemtittel'), {
                                '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn),
                            })}
                        </BodyShort>
                    )}
                </Heading>
            }
            erUgyldig={vedtak.revurdert || vedtak.annullert}
            dataCy="refusjon"
        >
            <VedtakPeriode vedtak={vedtak} skalViseRefusjonsMottaker={vedtak.sykepengebelopArbeidsgiver > 0} />
            <DelvisUtbetaling
                erDelvisInnvilget={erDelvisInnvilget}
                etterSkjønn={etterSkjønn}
                utbetalingsdager={utbetalingsdager}
            ></DelvisUtbetaling>
            {vedtak.sykepengebelopArbeidsgiver > 0 && <ArbeidsgiverInfo vedtak={vedtak} />}
        </UtbetalingPanel>
    )
}

export default RefusjonMedInntekt
