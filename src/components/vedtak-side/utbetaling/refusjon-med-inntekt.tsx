import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import UtbetalingPanel from '../../panel/utbetaling-panel'

import { ArbeidsgiverInfo } from './arbeidsgiver-info'

// det er denne vi endrer på
// http://localhost:8080/syk/sykepenger?testperson=vedtak-med-0-utbetaling&id=b40ac0ce-8ff3-4218-b981-825f2e139ab1

// ts interface which extends VedtakProps
interface RefusjonMedInntektProps extends VedtakProps {
    skalViseRefusjonsMottaker: boolean
}

const RefusjonMedInntekt = ({ vedtak, skalViseRefusjonsMottaker }: RefusjonMedInntektProps) => {
    const belop = ValutaFormat.format(vedtak.sykepengebelopArbeidsgiver)
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert

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
            <VedtakPeriode vedtak={vedtak} skalViseRefusjonsMottaker={skalViseRefusjonsMottaker} />
            {vedtak.sykepengebelopArbeidsgiver > 0 && <ArbeidsgiverInfo vedtak={vedtak} />}
        </UtbetalingPanel>
    )
}

export default RefusjonMedInntekt
