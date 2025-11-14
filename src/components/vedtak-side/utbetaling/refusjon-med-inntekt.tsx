import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import UtbetalingPanel from '../../panel/utbetaling-panel'
import { finnOppsumertAvslag, hentBegrunnelse } from '../../../utils/vedtak-utils'

import { ArbeidsgiverInfo } from './arbeidsgiver-info'
import { OppsumertAvslagListe, OppsumertAvslagListeProps } from './oppsumert-avslag-liste'

const RefusjonMedInntekt = ({ vedtak }: VedtakProps) => {
    const belop = ValutaFormat.format(vedtak.sykepengebelopArbeidsgiver)
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const harBegrunnelseFraBomlo = hentBegrunnelse(vedtak, 'DelvisInnvilgelse') !== undefined
    const oppsumertAvslagObject: OppsumertAvslagListeProps = {
        ...finnOppsumertAvslag(vedtak, 'dagerArbeidsgiver'),
        harBegrunnelseFraBomlo,
        vedtak,
    }
    return (
        <UtbetalingPanel
            delvisInnvilgelse={oppsumertAvslagObject.oppsumertAvslag.size > 0}
            sectionLabel="Refusjon til arbeidsgiver"
            tittel={
                <Heading level="2" size="large">
                    {annullertEllerRevurdert ? (
                        <del>
                            {belop + ' kr'}
                            <span className="sr-only">(ikke gjeldende)</span>
                        </del>
                    ) : (
                        <span>{belop + ' kr'}</span>
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
            dataTestId="refusjon"
        >
            <VedtakPeriode vedtak={vedtak} skalViseRefusjonsMottaker={vedtak.sykepengebelopArbeidsgiver > 0} />
            <OppsumertAvslagListe {...oppsumertAvslagObject}></OppsumertAvslagListe>
            {vedtak.sykepengebelopArbeidsgiver > 0 && <ArbeidsgiverInfo vedtak={vedtak} />}
        </UtbetalingPanel>
    )
}

export default RefusjonMedInntekt
