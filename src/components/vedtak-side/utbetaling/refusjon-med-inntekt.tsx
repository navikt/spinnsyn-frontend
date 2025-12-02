import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import UtbetalingPanel from '../../panel/utbetaling-panel'
import { unikeAvslagBegrunnelser, hentBegrunnelse } from '../../../utils/vedtak-utils'

import { ArbeidsgiverInfo } from './arbeidsgiver-info'
import { OppsumertAvslagListe, OppsummertAvslagListeProps } from './oppsumert-avslag-liste'

const RefusjonMedInntekt = ({ vedtak }: VedtakProps) => {
    const belop = ValutaFormat.format(vedtak.sykepengebelopArbeidsgiver)
    const harBegrunnelseFraBomlo = hentBegrunnelse(vedtak, 'DelvisInnvilgelse') !== undefined
    const avslagBegrunnelser = unikeAvslagBegrunnelser(vedtak.dagerArbeidsgiver)
    const oppsumertAvslagObject: OppsummertAvslagListeProps = {
        title: 'Noen av dagene er ikke innvilget fordi:',
        oppsummertAvslag: avslagBegrunnelser,
        harBegrunnelseFraBomlo,
        vedtak,
        dagTabellScrollElement: 'sykepenger_per_dag_arbeidsgiver',
    }
    return (
        <UtbetalingPanel
            delvisInnvilgelse={oppsumertAvslagObject.oppsummertAvslag.size > 0}
            sectionLabel="Refusjon til arbeidsgiver"
            tittel={
                <Heading level="2" size="large">
                    {belop + ' kr'}
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
