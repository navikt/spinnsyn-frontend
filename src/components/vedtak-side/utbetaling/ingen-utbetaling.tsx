import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import UtbetalingPanel from '../../panel/utbetaling-panel'

const IngenUtbetaling = ({ vedtak }: VedtakProps) => {
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const ingenUtbetalingTittel = 'Ingen utbetaling'
    const utbetalingsType = vedtak.sykepengebelopPerson > 0 ? 'personutbetaling' : 'refusjon'

    return (
        <UtbetalingPanel
            sectionLabel="Ingen utbetaling"
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
        </UtbetalingPanel>
    )
}

export default IngenUtbetaling
