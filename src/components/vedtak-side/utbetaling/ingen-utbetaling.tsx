import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import UtbetalingPanel from '../../panel/utbetaling-panel'
import { finnOppsumertAvslag, hentBegrunnelse } from '../../../utils/vedtak-utils'
import { RSVedtakWrapperUtvidet } from '../../../types/rs-types/rs-vedtak'
import { erWeekendPeriod } from '../../../utils/dato-utils'
import { OppsumertAvslagListe, OppsumertAvslagListeProps } from './oppsumert-avslag-liste'

const IngenUtbetaling = ({ vedtak }: { vedtak: RSVedtakWrapperUtvidet }) => {
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const ingenUtbetalingTittel = 'Ingen utbetaling'
    const utbetalingsType = vedtak.sykepengebelopPerson > 0 ? 'personutbetaling' : 'refusjon'
    const harBegrunnelseFraBomlo = hentBegrunnelse(vedtak, 'Avslag') !== undefined
    const oppsumertAvslagObject: OppsumertAvslagListeProps = {
        ...finnOppsumertAvslag(vedtak, 'alleDager'),
        harBegrunnelseFraBomlo,
    }


    const erWeekendPeriode  = erWeekendPeriod(vedtak.vedtak.fom, vedtak.vedtak.tom)
    return (
        <UtbetalingPanel
            sectionLabel="Ingen utbetaling"
            avslag={oppsumertAvslagObject.oppsumertAvslag.size > 0}
            tittel={
                <Heading level="2" size="large">
                    {annullertEllerRevurdert ? (
                        <del>
                            {ingenUtbetalingTittel}
                            <span className="sr-only">(ikke gjeldende)</span>
                        </del>
                    ) : (
                        <span>{ingenUtbetalingTittel}</span>
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
            erUgyldig={annullertEllerRevurdert}
            dataCy={utbetalingsType}
        >
            <VedtakPeriode vedtak={vedtak} />
            <OppsumertAvslagListe {...oppsumertAvslagObject}></OppsumertAvslagListe>
        </UtbetalingPanel>
    )
}

export default IngenUtbetaling
